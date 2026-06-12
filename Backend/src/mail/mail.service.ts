import { Injectable } from '@nestjs/common';
import {
    SESClient,
    SendEmailCommand,
} from '@aws-sdk/client-ses';

@Injectable()
export class MailService {
    private ses: SESClient;

    constructor() {
        this.ses = new SESClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId:
                    process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey:
                    process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async sendOtp(
        email: string,
        otp: string,
        time: number = 3
    ) {
        const command = new SendEmailCommand({
            Source: process.env.SES_FROM_EMAIL,

            Destination: {
                ToAddresses: [email],
            },

            Message: {
                Subject: {
                    Data: 'Xác thực OTP',
                },

                Body: {
                    Html: {
                        Data: `
              <h1>Xác thực OTP</h1>
              <p>Mã OTP của bạn:</p>
              <h2>${otp}</h2>
              <p>Thời gian hết hạn: ${time} phút</p>
            `,
                    },
                },
            },
        });

        return this.ses.send(command);
    }
}