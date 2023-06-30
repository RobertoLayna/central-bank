import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBankDto {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsNotEmpty()
    name: string


    @IsString()
    @IsNotEmpty()
    description: string


    @IsNumber()
    @IsOptional()
    status?: number
}
