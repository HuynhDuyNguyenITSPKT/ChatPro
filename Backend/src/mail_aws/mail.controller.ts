import { Controller, Post, Body } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService) {
    }

    @Post("send-otp")
    async sendOtp(@Body() body: { email: string, otp: string }) {
        const { email, otp } = body;

        await this.mailService.sendOtp(email, otp);

        return { message: 'success' };
    }
}