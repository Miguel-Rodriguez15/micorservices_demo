import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory-service.service';
import { CreateProductDto } from 'shared/libs/src/dto/inventory-service/create-product.dto';
import { UpdateProductDto } from 'shared/libs/src/dto/inventory-service/update-product.dto';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.inventoryService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(
    @Payload() payload: { id: string; updateProductDto: UpdateProductDto },
  ) {
    return this.inventoryService.update(payload.id, payload.updateProductDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() id: string) {
    return this.inventoryService.remove(id);
  }

  @MessagePattern({ cmd: 'find_product' })
  findOne(@Payload() id: string) {
    return this.inventoryService.findOne(id);
  }

  @MessagePattern({ cmd: 'find_all_products' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @MessagePattern({ cmd: 'update_stock' })
  updateStock(@Payload() payload: { id: string; quantity: number }) {
    return this.inventoryService.updateStock(payload.id, payload.quantity);
  }
}
