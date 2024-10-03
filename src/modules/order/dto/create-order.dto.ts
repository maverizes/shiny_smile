import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    created_at: Date;

    @IsEnum(['pending', 'completed', 'cancelled'])
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    customer_id: number;
}


