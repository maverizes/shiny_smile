import { IsNotEmpty, IsString } from "class-validator";

export class UpdateReviewDto {
    @IsString()
    @IsNotEmpty()
    readonly content: string;
}
