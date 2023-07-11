import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransferenceDto {
    @IsString()
    @IsNotEmpty()
    user_account: string

    @IsString()
    @IsNotEmpty()
    receptor_account: string

    @IsNumber()
    @IsNotEmpty()
    amount: number
}
