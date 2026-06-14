import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { MailModule } from './SES/mail.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { S3Module } from './S3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: process.env.MONGODB_URI || '',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    NoteModule,
    MailModule,
    RedisModule,
    AdminModule,
    S3Module,
  ],
})
export class AppModule { }
