import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsEnum(['pending', 'completed', 'cancelled'])
    status: string;
}
