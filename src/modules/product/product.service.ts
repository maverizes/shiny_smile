import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product)
        private readonly productModel: typeof Product
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productModel.create(createProductDto);
    }

    async getAllProductsByCategory(categoryId: number): Promise<Product[]> {
        return this.productModel.findAll({
            where: { categoryId },
        });
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productModel.findByPk(id);
        if (!product) throw new NotFoundException(`Product not found`);
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        return product.update(updateProductDto);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await product.destroy();
    }
}
