import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("orders")
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.orderService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.orderService.remove(id);
    }
}
