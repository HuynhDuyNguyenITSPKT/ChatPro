import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/req/RegisterDto";
import { MailService } from "../mail_aws/mail.service";
import { RedisService } from "../redis/redis.service";
import { Model } from "mongoose";
import { User } from "../user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { VerifyOtpDto } from "../dto/req/VerifyOtpDto";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly mailService: MailService,
        private readonly redisService: RedisService,
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
            success: true
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

    login() {
        return {
            message: "login service"
        }
    }
}
