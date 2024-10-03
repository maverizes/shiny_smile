import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category)
        private readonly categoryModel: typeof Category,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.categoryModel.create(createCategoryDto);
        return category;
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.findAll({ include: { all: true } });
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryModel.findByPk(id, { include: { all: true } });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        await category.update(updateCategoryDto);
        return category;
    }

    async remove(id: number): Promise<void> {
        const category = await this.findOne(id);
        await category.destroy();
    }
}
