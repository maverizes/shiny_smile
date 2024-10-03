import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsInt()
    @IsNotEmpty()
    price?: number;

    @IsString()
    @IsNotEmpty()
    image?: string

    @IsNotEmpty()
    @IsNumber()
    category_id: number;

    

}
