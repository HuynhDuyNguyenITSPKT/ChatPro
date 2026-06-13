import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { MailModule } from "../SES/mail.module";
import { RedisModule } from "../redis/redis.module";
import { JwtModule } from "@nestjs/jwt";
import { Blacklist, BlacklistSchema } from "./blacklist.schema";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
    imports: [
        forwardRef(() => UserModule),
        MailModule,
        RedisModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {
                expiresIn: '15m',
            },
        }),
        MongooseModule.forFeature([{ name: Blacklist.name, schema: BlacklistSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule { }

