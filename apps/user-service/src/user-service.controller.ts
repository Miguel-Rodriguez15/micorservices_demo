import { Controller } from '@nestjs/common';
import { UserService } from './user-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/libs/src/dto/user-service/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userServiceService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(createUserDto: CreateUserDto) {
    return this.userServiceService.create(createUserDto);
  }
}
