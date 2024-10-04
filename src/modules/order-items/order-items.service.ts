import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './model/order-item.model';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return await this.orderItemModel.create(createOrderItemDto);
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemModel.findAll();
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemModel.findByPk(id);
    if (!item) {
      throw new NotFoundException('Order Item not found');
    }
    return item;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const item = await this.findOne(id);
    return await item.update(updateOrderItemDto);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await item.destroy();
  }
}
