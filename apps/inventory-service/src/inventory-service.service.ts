import { Injectable, Logger } from '@nestjs/common';
import { UpdateProductDto } from 'shared/libs/src/dto/inventory-service/update-product.dto';
import { CreateProductDto } from 'shared/libs/src/dto/inventory-service/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Product } from './entities/inventory-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger('InventoryService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.logger.error(`Error creating product: ${error.message}`);
      throw new RpcException({
        message: 'Error creating product',
        statusCode: 500,
      });
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      this.logger.error(`Error finding products: ${error.message}`);
      throw new RpcException({
        message: 'Error finding products',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new RpcException({
          message: `Product with ID "${id}" not found`,
          statusCode: 404,
        });
      }
      return product;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error finding product: ${error.message}`);
      throw new RpcException({
        message: 'Error finding product',
        statusCode: 500,
      });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      const updatedProduct = Object.assign(product, updateProductDto);
      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error updating product: ${error.message}`);
      throw new RpcException({
        message: 'Error updating product',
        statusCode: 500,
      });
    }
  }

  async updateStock(id: string, quantity: number) {
    try {
      console.log(`updateStock llamado con id: ${id}, quantity: ${quantity}`);
      const product = await this.findOne(id);
      if (product.stock + quantity < 0) {
        throw new RpcException({
          message: 'Insufficient stock',
          statusCode: 400,
        });
      }
      product.stock += quantity;
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error updating stock: ${error.message}`);
      throw new RpcException({
        message: 'Error updating stock',
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      await this.productRepository.remove(product);
      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error removing product: ${error.message}`);
      throw new RpcException({
        message: 'Error removing product',
        statusCode: 500,
      });
    }
  }
}
