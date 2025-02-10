import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CustomerService } from './customer-service.service';
import { CreateCustomerDto } from 'shared/libs/src/dto/customer-service/create-customer-service.dto';
import { UpdateCustomerDto } from 'shared/libs/src/dto/customer-service/update-customer-service.dto';

@Controller()
export class CustomerServiceController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: 'create_customer' }) create(
    @Payload() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.create(createCustomerDto);
  }

  @MessagePattern({ cmd: 'find_all_customer' })
  findAll() {
    return this.customerService.findAll();
  }

  @MessagePattern({ cmd: 'find_customer' })
  findOne(@Payload() id: string) {
    return this.customerService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_customer' })
  update(
    @Payload()
    payload: {
      id: string;
      updateCustomerDto: UpdateCustomerDto;
    },
  ) {
    if (!payload.updateCustomerDto) {
      throw new RpcException({
        message: 'updateCustomerDto is missing in the payload',
        statusCode: 400,
      });
    }
    return this.customerService.update(payload.id, payload.updateCustomerDto);
  }

  @MessagePattern({ cmd: 'delete_customer' })
  remove(@Payload() id: string) {
    return this.customerService.remove(id);
  }
}
