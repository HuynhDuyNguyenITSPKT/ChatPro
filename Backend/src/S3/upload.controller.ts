import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly s3Service: S3Service) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.s3Service.uploadFile(file);
    }
}