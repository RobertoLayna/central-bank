import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(13)
    rfc: string

    @IsPhoneNumber("MX")
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(13)
    phone: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNumber()
    @IsNotEmpty()
    id_bank: number
}
