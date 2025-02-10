import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto } from 'shared/libs/src/dto/billing-service/create-billing-service.dto';
import { Invoice, InvoiceItem } from './entities/billing-service.entity';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateInvoiceItemReturnDto } from 'shared/libs/src/dto/billing-service/create-invoice-item-return.dto';
import { UpdateInvoiceDto } from 'shared/libs/src/dto/billing-service/update-billing-service.dto';

@Injectable()
export class BillingServiceService {
  private readonly logger = new Logger(BillingServiceService.name);
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
    @Inject('INVENTORY_SERVICE') private readonly inventoryService: ClientProxy,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = this.invoiceRepository.create({
        customerId: createInvoiceDto.customerId,
        total: 0,
      });

      const savedInvoice = await this.invoiceRepository.save(invoice);

      let total = 0;
      for (const item of createInvoiceDto.items) {
        const invoiceItem = this.invoiceItemRepository.create({
          invoiceId: savedInvoice.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        });

        total += invoiceItem.subtotal;

        try {
          await this.inventoryService
            .send(
              { cmd: 'update_stock' },
              { id: item.productId, quantity: -item.quantity },
            )
            .toPromise();
        } catch (inventoryError) {
          this.logger.error(inventoryError);
          throw new RpcException({
            message: 'Error updating stock in inventory service',
            statusCode: 500,
          });
        }

        await this.invoiceItemRepository.save(invoiceItem);
      }

      savedInvoice.total = total;
      await this.invoiceRepository.save(savedInvoice);

      return savedInvoice;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'Error ',
        statusCode: 500,
      });
    }
  }

  async processReturn(returnDto: CreateInvoiceItemReturnDto) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: { id: returnDto.invoiceId },
      });

      if (!invoice) {
        throw new RpcException({
          message: 'Invoice not found',
          statusCode: 404,
        });
      }

      for (const item of returnDto.items) {
        await this.inventoryService
          .send(
            { cmd: 'update_stock' },
            { id: item.productId, quantity: item.quantity },
          )
          .toPromise();
      }

      invoice.status = 'RETURNED';
      await this.invoiceRepository.save(invoice);

      return invoice;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'Error finding role',
        statusCode: 500,
      });
    }
  }

  async findAll() {
    try {
      return await this.invoiceRepository.find({
        relations: ['items'],
      });
    } catch (error) {
      this.logger.error(`Error finding invoices: ${error.message}`);
      throw new RpcException({
        message: 'Error finding invoices',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: { id },
        relations: ['items'],
      });

      if (!invoice) {
        throw new RpcException({
          message: `Invoice with ID "${id}" not found`,
          statusCode: 404,
        });
      }

      return invoice;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error finding invoice: ${error.message}`);
      throw new RpcException({
        message: 'Error finding invoice',
        statusCode: 500,
      });
    }
  }

  private async validateStock(
    productId: string,
    quantity: number,
  ): Promise<void> {
    try {
      const stock = await this.inventoryService
        .send({ cmd: 'check_stock' }, { id: productId, quantity })
        .toPromise();

      if (!stock || !stock.available) {
        throw new RpcException({
          message: 'Insufficient stock',
          statusCode: 400,
        });
      }
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error validating stock: ${error.message}`);
      throw new RpcException({
        message: 'Error validating stock',
        statusCode: 500,
      });
    }
  }

  private async validateCustomer(customerId: string): Promise<boolean> {
    try {
      const customer = await this.inventoryService
        .send({ cmd: 'find_customer' }, { id: customerId })
        .toPromise();
      return !!customer;
    } catch (error) {
      this.logger.error(`Error validating customer: ${error.message}`);
      throw new RpcException({
        message: 'Error validating customer',
        statusCode: 500,
      });
    }
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      const invoice = await this.findOne(id);

      if (updateInvoiceDto.customerId !== undefined) {
        const customerExists = await this.validateCustomer(
          updateInvoiceDto.customerId,
        );
        if (!customerExists) {
          throw new RpcException({
            message: 'Customer not found',
            statusCode: 404,
          });
        }
        invoice.customerId = updateInvoiceDto.customerId;
      }

      if (updateInvoiceDto.items !== undefined) {
        await this.invoiceItemRepository.delete({ invoiceId: id });

        let total = 0;
        for (const item of updateInvoiceDto.items) {
          await this.validateStock(item.productId, item.quantity);

          const invoiceItem = this.invoiceItemRepository.create({
            invoiceId: id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
          });
          total += invoiceItem.subtotal;

          await this.inventoryService
            .send(
              { cmd: 'update_stock' },
              { id: item.productId, quantity: -item.quantity },
            )
            .toPromise();
          await this.invoiceItemRepository.save(invoiceItem);
        }
        invoice.total = total;
      }

      if (updateInvoiceDto.total !== undefined) {
        invoice.total = updateInvoiceDto.total;
      }

      if (updateInvoiceDto.status !== undefined) {
        invoice.status = updateInvoiceDto.status;
      }

      return await this.invoiceRepository.save(invoice);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error updating invoice: ${error.message}`);
      throw new RpcException({
        message: 'Error updating invoice',
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    try {
      const invoice = await this.findOne(id);

      // Revert inventory changes
      const items = await this.invoiceItemRepository.find({
        where: { invoiceId: id },
      });

      for (const item of items) {
        await this.inventoryService
          .send(
            { cmd: 'update_stock' },
            { id: item.productId, quantity: item.quantity },
          )
          .toPromise();
      }

      // Delete invoice items first
      await this.invoiceItemRepository.delete({ invoiceId: id });

      // Delete invoice
      await this.invoiceRepository.remove(invoice);

      return { message: 'Invoice deleted successfully' };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      this.logger.error(`Error removing invoice: ${error.message}`);
      throw new RpcException({
        message: 'Error removing invoice',
        statusCode: 500,
      });
    }
  }
}
