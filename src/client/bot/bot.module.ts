import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "../../modules/category/model/category.model";
import { Product } from "src/modules/product/model/product.model";
import { CategoryModule, ProductModule } from "@modules";

@Module({
    imports: [CategoryModule, ProductModule],
    providers: [BotService]
})
export class BotModule { }