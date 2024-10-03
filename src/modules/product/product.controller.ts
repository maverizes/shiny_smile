import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("products")
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }
}
