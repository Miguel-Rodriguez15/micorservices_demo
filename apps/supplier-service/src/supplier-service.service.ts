import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from 'shared/libs/src/dto/supplier-service/create-supplier-service.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateSupplierDto } from 'shared/libs/src/dto/supplier-service/update-supplier-service.dto';
import { Supplier } from './entities/supplier-service.entity';

@Injectable()
export class SupplierServiceService {
  private readonly logger = new Logger('SupplierService');

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const existingSupplier = await this.supplierRepository.findOne({
        where: { email: createSupplierDto.email },
      });

      if (existingSupplier) {
        throw new RpcException({
          message: 'Supplier with this email already exists',
          statusCode: 400,
        });
      }

      const supplier = this.supplierRepository.create(createSupplierDto);
      return await this.supplierRepository.save(supplier);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error creating supplier: ${error.message}`);
      throw new RpcException({
        message: 'Error creating supplier',
        statusCode: 500,
      });
    }
  }

  async findAll() {
    try {
      return await this.supplierRepository.find();
    } catch (error) {
      this.logger.error(`Error finding suppliers: ${error.message}`);
      throw new RpcException({
        message: 'Error finding suppliers',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new RpcException({
          message: `Supplier with ID "${id}" not found`,
          statusCode: 404,
        });
      }
      return supplier;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error finding supplier: ${error.message}`);
      throw new RpcException({
        message: 'Error finding supplier',
        statusCode: 500,
      });
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    try {
      if (!updateSupplierDto) {
        throw new RpcException({
          message: 'updateSupplierDto is undefined',
          statusCode: 400,
        });
      }

      const supplier = await this.findOne(id);
      if (!supplier) {
        throw new NotFoundException(`Supplier with id ${id} not found`);
      }

      if (
        updateSupplierDto.email &&
        updateSupplierDto.email !== supplier.email
      ) {
        const existingSupplier = await this.supplierRepository.findOne({
          where: { email: updateSupplierDto.email },
        });

        if (existingSupplier) {
          throw new RpcException({
            message: 'Supplier with this email already exists',
            statusCode: 400,
          });
        }
      }

      const updatedSupplier = Object.assign(supplier, updateSupplierDto);
      return await this.supplierRepository.save(updatedSupplier);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error updating supplier: ${error.message}`);
      throw new RpcException({
        message: error.message || 'Error updating supplier',
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    try {
      const supplier = await this.findOne(id);
      await this.supplierRepository.remove(supplier);
      return { message: 'Supplier deleted successfully' };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error removing supplier: ${error.message}`);
      throw new RpcException({
        message: 'Error removing supplier',
        statusCode: 500,
      });
    }
  }
}
