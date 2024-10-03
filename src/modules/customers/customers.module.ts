import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';
import { Customer } from './model/customer.model';

@Module({
    imports: [SequelizeModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
