import { Controller } from '@nestjs/common';
import { UserService } from './user-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userServiceService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(createUserDto: CreateUserDto) {
    return this.userServiceService.create(createUserDto);
  }
}
