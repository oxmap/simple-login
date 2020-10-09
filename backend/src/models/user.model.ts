import { Length, IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Entity } from './Entity';
import { ApiProperty } from '@nestjs/swagger';

export class User extends Entity {
    @IsString() @IsEmail() email: string;
    @IsOptional() @IsString() password: string;
    @IsString() token: string;

    constructor(user: Partial<User>) {
        super(user);
    }
}

export class LoginRequest {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
    constructor(login?: Partial<LoginRequest>) {
        Object.assign(this, login);
    }
}

export class SigninRequest {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @Length(5, 10)
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    rePassword: string;

    constructor(login?: Partial<LoginRequest>) {
        Object.assign(this, login);
    }
}
