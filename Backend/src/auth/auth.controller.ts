import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/req/RegisterDto";
import { VerifyOtpDto } from "../dto/req/VerifyOtpDto";
import { LoginDto } from "src/dto/req/LoginDto";
import { RefreshTokenDto } from "src/dto/req/RefreshTokenDto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post("register")
    register(@Body() body: RegisterDto) {
        return this.authService.register(body)
    }

    @Post("verify-otp")
    verifyOtp(@Body() body: VerifyOtpDto) {
        return this.authService.verifyOtp(body)
    }

    @Post("login")
    login(@Body() body: LoginDto) {
        return this.authService.login(body)
    }

    @Post("refresh-token")
    refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body)
    }

    @UseGuards(JwtAuthGuard)
    @Post("logout")
    logout(@Req() req: any) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];
        return this.authService.logout(token, req.user);
    }

}
