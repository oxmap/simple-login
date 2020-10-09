import { Length, IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Entity } from './Entity';

export class User extends Entity {
    @IsString() @IsEmail() email: string;
    @IsOptional() @IsString() password: string;

    constructor(user: Partial<User>) {
        super(user);
    }
}

export class LoginRequest {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    constructor(login?: Partial<LoginRequest>) {
        Object.assign(this, login);
    }
}

export class signinRequest {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    token: string;

    @IsString()
    @Length(5, 10)
    password: string;

    @IsString()
    rePassword: string;

    constructor(login?: Partial<LoginRequest>) {
        Object.assign(this, login);
    }
}
