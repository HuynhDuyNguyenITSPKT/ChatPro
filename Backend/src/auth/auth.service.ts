import { Injectable } from "@nestjs/common";
import bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/req/RegisterDto";
import { MailService } from "../SES/mail.service";
import { RedisService } from "../redis/redis.service";
import { Model } from "mongoose";
import { User } from "../user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { VerifyOtpDto } from "../dto/req/VerifyOtpDto";
import { LoginDto } from "src/dto/req/LoginDto";
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from "src/dto/req/RefreshTokenDto";
import { Blacklist } from "./blacklist.schema";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        @InjectModel(Blacklist.name)
        private readonly blacklistModel: Model<Blacklist>,
        private readonly mailService: MailService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService,
    ) { }
    async register(dto: RegisterDto) {
        const { email } = dto;

        const exist = await this.userModel.findOne({
            email,
        });

        if (exist) {
            return {
                message: 'Email đã tồn tại',
                success: false
            }
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000,
        ).toString();

        await this.redisService.set(
            `otp:${email}`,
            otp,
            300,
        );

        await this.redisService.set(
            `register:${email}`,
            JSON.stringify(dto),
            300,
        );

        await this.mailService.sendOtp(
            email,
            otp,
        );

        return {
            message: 'OTP đã được gửi thành công',
            success: true,
            data: {
                "Email": dto.email
            }
        };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const { email, otp } = dto;

        const storedOtp = await this.redisService.get(`otp:${email}`);

        if (!storedOtp) {
            return {
                message: 'OTP không tồn tại hoặc đã hết hạn',
                success: false
            }
        }

        if (storedOtp !== otp) {
            return {
                message: 'OTP không chính xác',
                success: false
            }
        }

        const userData = await this.redisService.get(`register:${email}`);
        if (!userData) {
            return {
                message: 'Dữ liệu đăng ký không tồn tại',
                success: false
            }
        }

        const user = JSON.parse(userData);
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new this.userModel({
            ...user,
            password: hashedPassword,
        });

        await newUser.save();

        await this.redisService.del(`otp:${email}`);
        await this.redisService.del(`register:${email}`);

        return {
            message: 'Đăng ký thành công',
            success: true
        };
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.userModel.findOne({
            email,
        });

        if (!user) {
            return {
                message: 'Email không tồn tại',
                success: false
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                message: 'Email hoặc mật khẩu không chính xác',
                success: false
            }
        }

        const token = await this.generateTokens(user._id.toString(), user.email);

        // Store refresh token in Redis with a 7-day TTL (604800 seconds)
        await this.redisService.set(
            `refreshToken:${user._id.toString()}`,
            token.refreshToken,
            604800,
        );

        return {
            message: 'Đăng nhập thành công',
            success: true,
            data: {
                "Email": user.email,
                "Name": user.name,
                "AccessToken": token.accessToken,
                "RefreshToken": token.refreshToken,
                "Role": user.role
            }
        };
    }

    async refreshToken(dto: RefreshTokenDto) {
        const { refreshToken } = dto;

        try {
            const decoded = await this.jwtService.verifyAsync(
                refreshToken,
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                },
            );

            // Verify if this refresh token is the one currently stored in Redis
            const storedRefreshToken = await this.redisService.get(
                `refreshToken:${decoded.sub}`,
            );

            if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
                return {
                    message: 'Token không hợp lệ hoặc đã hết hạn/được sử dụng',
                    success: false,
                };
            }

            const user = await this.userModel.findById(decoded.sub);
            if (!user) {
                return {
                    message: 'Không tìm thấy user',
                    success: false,
                };
            }

            const token = await this.generateTokens(user._id.toString(), user.email);

            // Overwrite the refresh token in Redis with the new one
            await this.redisService.set(
                `refreshToken:${user._id.toString()}`,
                token.refreshToken,
                604800,
            );

            return {
                message: 'Refresh token thành công',
                success: true,
                data: {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                },
            };
        } catch (error) {
            return {
                message: 'Token không hợp lệ',
                success: false,
            };
        }
    }

    async logout(token: string, userPayload: any) {
        if (!token) {
            return {
                message: 'Token không hợp lệ',
                success: false,
            };
        }

        try {
            // Decode token to get expiration time (exp)
            const decoded = this.jwtService.decode(token);
            const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15 * 60 * 1000);

            // Add token to blacklist
            await this.blacklistModel.create({
                token,
                expiresAt,
            });

            // Delete refresh token from Redis
            if (userPayload && userPayload.sub) {
                await this.redisService.del(`refreshToken:${userPayload.sub}`);
            }

            return {
                message: 'Đăng xuất thành công',
                success: true,
            };
        } catch (error) {
            return {
                message: 'Đăng xuất thất bại',
                success: false,
            };
        }
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        const isBlacklisted = await this.blacklistModel.findOne({ token });
        return !!isBlacklisted;
    }

    async generateTokens(userId: string, email: string) {
        const payload = {
            sub: userId,
            email,
        };

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            payload,
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            },
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
