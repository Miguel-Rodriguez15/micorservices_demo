import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Auth } from 'apps/user-service/src/auth/decorators/auth.decorater';
import { AllExceptionsFilter } from './rpc-exception.filter';
import { CreateUserDto } from 'shared/libs/src/dto/user-service/create-user.dto';
import { CreateRoleDto } from 'shared/libs/src/dto/roles/create-role.dto';
import { CreateInvoiceDto } from 'shared/libs/src/dto/billing-service/create-billing-service.dto';
import { CreateProductDto } from 'shared/libs/src/dto/inventory-service/create-product.dto';
import { CreateCustomerDto } from 'shared/libs/src/dto/customer-service/create-customer-service.dto';
import { UpdateProductDto } from 'shared/libs/src/dto/inventory-service/update-product.dto';
import { UpdateStockDto } from 'shared/libs/src/dto/inventory-service/update-stcok.dto';
import { CreateSupplierDto } from 'shared/libs/src/dto/supplier-service/create-supplier-service.dto';
import { UpdateSupplierDto } from 'shared/libs/src/dto/supplier-service/update-supplier-service.dto';
import { UpdateCustomerDto } from 'shared/libs/src/dto/customer-service/update-customer-service.dto';
import { UpdateInvoiceDto } from 'shared/libs/src/dto/billing-service/update-billing-service.dto';

@Controller()
@UseFilters(AllExceptionsFilter)
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('INVENTORY_SERVICE') private readonly inventoryService: ClientProxy,
    @Inject('BILLING_SERVICE') private readonly billingService: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private readonly customerService: ClientProxy,
    @Inject('SUPPLIER_SERVICE') private readonly supplierService: ClientProxy,
  ) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.send({ cmd: 'create_user' }, createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  login(@Body() loginUserDto: any) {
    return this.userService.send({ cmd: 'login' }, loginUserDto);
  }

  @Post('roles')
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.userService.send({ cmd: 'create_role' }, createRoleDto);
  }

  @Auth()
  @Get('roles/:id')
  async findOneRole(@Param('id') id: string) {
    return this.userService.send({ cmd: 'find_one_role' }, id);
  }

  @Delete('roles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeRole(@Param('id') id: string) {
    return this.userService.send({ cmd: 'remove_role' }, id);
  }

  @Post('billing')
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.billingService.send(
      { cmd: 'create_invoice' },
      createInvoiceDto,
    );
  }

  @Get('billing')
  findAllInvoice() {
    return this.billingService.send({ cmd: 'find_all_invoice' }, {});
  }

  @Get('billing/:id')
  findInvoice(@Param('id') id: string) {
    return this.billingService.send({ cmd: 'find_invoice' }, id);
  }

  @Patch('billing/:id')
  updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.billingService.send(
      { cmd: 'update_invoice' },
      { id, updateInvoiceDto },
    );
  }

  @Delete('billing/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeInvoice(@Param('id') id: string) {
    return this.billingService.send({ cmd: 'delete_invoice' }, id);
  }

  @Post('inventory')
  createInventory(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }
  @Patch('inventory/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.inventoryService.send(
      { cmd: 'update_product' },
      { id, updateProductDto },
    );
  }

  @Delete('inventory/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProduct(@Param('id') id: string) {
    return this.inventoryService.send({ cmd: 'delete_product' }, id);
  }

  @Get('inventory/:id')
  findProduct(@Param('id') id: string) {
    return this.inventoryService.send({ cmd: 'find_product' }, id);
  }

  @Get('inventory')
  findAllProducts() {
    return this.inventoryService.send({ cmd: 'find_all_products' }, {});
  }

  @Patch('inventory/:id/stock')
  updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.inventoryService.send(
      { cmd: 'update_stock' },
      { id, updateStockDto },
    );
  }

  @Post('customer')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.send(
      { cmd: 'create_customer' },
      createCustomerDto,
    );
  }

  @Get('customer')
  findAllCustomer() {
    return this.customerService.send({ cmd: 'create_customer' }, {});
  }

  @Get('customer/:id')
  findCustomer(@Param('id') id: string) {
    return this.customerService.send({ cmd: 'find_customer' }, id);
  }

  @Patch('customer/:id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.send(
      { cmd: 'update_customer' },
      { id, updateCustomerDto },
    );
  }

  @Delete('customer/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCustomer(@Param('id') id: string) {
    return this.customerService.send({ cmd: 'delete_customer' }, id);
  }

  @Post('supplier')
  createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.send(
      { cmd: 'create_supplier' },
      createSupplierDto,
    );
  }

  @Get('supplier')
  findAllSupplier() {
    return this.supplierService.send({ cmd: 'find_all_supplier' }, {});
  }

  @Get('supplier/:id')
  findSupplier(@Param('id') id: string) {
    return this.supplierService.send({ cmd: 'find_supplier' }, id);
  }

  @Patch('supplier/:id')
  updateSupplier(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.send(
      { cmd: 'update_supplier' },
      {
        id,
        updateSupplierDto,
      },
    );
  }

  @Delete('supplier/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSupplier(@Param('id') id: string) {
    return this.supplierService.send({ cmd: 'delete_supplier' }, id);
  }
}
