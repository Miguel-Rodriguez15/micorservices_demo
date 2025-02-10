import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { SupplierServiceService } from './supplier-service.service';
import { CreateSupplierDto } from 'shared/libs/src/dto/supplier-service/create-supplier-service.dto';
import { UpdateSupplierDto } from 'shared/libs/src/dto/supplier-service/update-supplier-service.dto';

@Controller()
export class SupplierServiceController {
  constructor(
    private readonly supplierServiceService: SupplierServiceService,
  ) {}

  @MessagePattern({ cmd: 'create_supplier' })
  create(@Payload() createSupplierServiceDto: CreateSupplierDto) {
    return this.supplierServiceService.create(createSupplierServiceDto);
  }

  @MessagePattern({ cmd: 'find_all_supplier' })
  findAll() {
    return this.supplierServiceService.findAll();
  }

  @MessagePattern({ cmd: 'find_supplier' })
  findOne(@Payload() id: string) {
    return this.supplierServiceService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_supplier' })
  async handleUpdateSupplier(
    @Payload() data: { id: string; updateSupplierDto: UpdateSupplierDto },
  ) {
    if (!data.updateSupplierDto) {
      throw new RpcException({
        message: 'updateSupplierDto is missing in the payload',
        statusCode: 400,
      });
    }

    return this.supplierServiceService.update(data.id, data.updateSupplierDto);
  }

  @MessagePattern({ cmd: 'delete_supplier' })
  remove(@Payload() id: string) {
    return this.supplierServiceService.remove(id);
  }
}
