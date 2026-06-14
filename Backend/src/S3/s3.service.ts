import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Service {
    private s3: S3Client;

    constructor(private configService: ConfigService) {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId:
                    process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey:
                    process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const bucket =
            process.env.AWS_BUCKET_NAME;

        const key = `uploads/${Date.now()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return {
            key,
            url: `https://${bucket}.s3.${this.configService.get(
                'AWS_REGION',
            )}.amazonaws.com/${key}`,
        };
    }
}