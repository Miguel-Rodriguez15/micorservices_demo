import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BillingServiceService } from './billing-service.service';
import { CreateInvoiceDto } from 'shared/libs/src/dto/billing-service/create-billing-service.dto';
import { UpdateInvoiceDto } from 'shared/libs/src/dto/billing-service/update-billing-service.dto';

@Controller()
export class BillingServiceController {
  constructor(private readonly billingServiceService: BillingServiceService) {}

  @MessagePattern({ cmd: 'create_invoice' })
  create(@Payload() createInvoiceDto: CreateInvoiceDto) {
    return this.billingServiceService.create(createInvoiceDto);
  }

  @MessagePattern({ cmd: 'find_all_invoice' })
  findAll() {
    return this.billingServiceService.findAll();
  }

  @MessagePattern({ cmd: 'find_invoice' })
  findOne(@Payload() id: string) {
    return this.billingServiceService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_invoice' })
  update(
    @Payload()
    payload: {
      id: string;
      updateInvoiceDto: UpdateInvoiceDto;
    },
  ) {
    if (!payload.updateInvoiceDto) {
      throw new RpcException({
        message: 'updateInvoiceDto is missing in the payload',
        statusCode: 400,
      });
    }
    return this.billingServiceService.update(
      payload.id,
      payload.updateInvoiceDto,
    );
  }

  @MessagePattern({ cmd: 'delete_invoice' })
  remove(@Payload() id: string) {
    return this.billingServiceService.remove(id);
  }
}
