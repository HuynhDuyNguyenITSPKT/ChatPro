import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { MailModule } from "../mail_aws/mail.module";
import { RedisModule } from "../redis/redis.module";

@Module({
    imports: [UserModule, MailModule, RedisModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
