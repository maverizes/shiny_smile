import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
    imports: [SequelizeModule.forFeature([Order])],
    providers: [OrderService],
    controllers: [OrderController],
})
export class OrderModule {}
