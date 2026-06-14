import { Global, Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [S3Service],
    controllers: [UploadController],
    exports: [S3Service],
})
export class S3Module { }