import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import { Customer } from './model/customer.model';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.customerService.create(createCustomerDto);
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Customer> {
        return this.customerService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateCustomerDto: UpdateCustomerDto
    ): Promise<Customer> {
        return this.customerService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.customerService.remove(id);
    }
}
