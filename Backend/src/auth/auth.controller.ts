import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/req/RegisterDto";
import { VerifyOtpDto } from "../dto/req/VerifyOtpDto";

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
    login() {
        return this.authService.login()
    }

}