import { RpcException } from '@nestjs/microservices';
import { Customer } from './entities/customer-service.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from 'shared/libs/src/dto/customer-service/create-customer-service.dto';
import { UpdateCustomerDto } from 'shared/libs/src/dto/customer-service/update-customer-service.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger('CustomerService');

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: createCustomerDto.email },
      });

      if (existingCustomer) {
        throw new RpcException({
          message: 'Customer with this email already exists',
          statusCode: 400,
        });
      }

      const customer = this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error creating customer: ${error.message}`);
      throw new RpcException({
        message: 'Error creating customer',
        statusCode: 500,
      });
    }
  }

  async findAll() {
    try {
      return await this.customerRepository.find();
    } catch (error) {
      this.logger.error(`Error finding customers: ${error.message}`);
      throw new RpcException({
        message: 'Error finding customers',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    try {
      const customer = await this.customerRepository.findOne({ where: { id } });
      if (!customer) {
        throw new RpcException({
          message: `Customer with ID "${id}" not found`,
          statusCode: 404,
        });
      }
      return customer;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error finding customer: ${error.message}`);
      throw new RpcException({
        message: 'Error finding customer',
        statusCode: 500,
      });
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.findOne(id);

      if (
        updateCustomerDto.email &&
        updateCustomerDto.email !== customer.email
      ) {
        const existingCustomer = await this.customerRepository.findOne({
          where: { email: updateCustomerDto.email },
        });

        if (existingCustomer) {
          throw new RpcException({
            message: 'Customer with this email already exists',
            statusCode: 400,
          });
        }
      }

      const updatedCustomer = Object.assign(customer, updateCustomerDto);
      return await this.customerRepository.save(updatedCustomer);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error updating customer: ${error.message}`);
      throw new RpcException({
        message: error,
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    try {
      const customer = await this.findOne(id);
      await this.customerRepository.remove(customer);
      return { message: 'Customer deleted successfully' };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error removing customer: ${error.message}`);
      throw new RpcException({
        message: 'Error removing customer',
        statusCode: 500,
      });
    }
  }
}
