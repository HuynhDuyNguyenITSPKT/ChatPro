import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @MinLength(6)
    password: string;
}

