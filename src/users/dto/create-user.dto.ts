import { IsEmail, IsEnum, IsString, IsNotEmpty } from "class-validator";


export class createUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ADMIN', 'MANAGER'], {
        message: 'valid role required'
    })
    role: 'INTERN' | 'ADMIN' | 'MANAGER';
}

