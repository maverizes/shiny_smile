import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDate()
    created_at: Date;

    @IsEnum(['pending', 'completed', 'cancelled'])
    @IsNotEmpty()
    status: string;

    @IsNumber()
    @IsNotEmpty()
    customer_id: number;
}


