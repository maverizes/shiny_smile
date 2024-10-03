import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './model/customer.model';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer)
        private readonly customerModel: typeof Customer
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = new Customer({ ...createCustomerDto });
        return customer.save();
    }

    async findAll(): Promise<Customer[]> {
        return this.customerModel.findAll();
    }

    async findOne(id: number): Promise<Customer> {
        const customer = await this.customerModel.findByPk(id);
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);
        customer.update(updateCustomerDto);
        return customer.save();
    }

    async remove(id: number): Promise<void> {
        const customer = await this.findOne(id);
        await customer.destroy();
    }
}
