import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  @Post('users')
  async createUser(@Body() createUserDto: any) {
    return this.userService.send({ cmd: 'create_user' }, createUserDto);
  }
}
