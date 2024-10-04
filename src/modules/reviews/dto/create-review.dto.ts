import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsNumber()
    @IsNotEmpty()
    readonly customer_id: number;
}

