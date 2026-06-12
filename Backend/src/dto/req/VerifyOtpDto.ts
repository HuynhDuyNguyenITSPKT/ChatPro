import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;
}