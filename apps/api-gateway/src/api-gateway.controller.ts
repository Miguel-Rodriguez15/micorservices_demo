import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Auth } from 'apps/user-service/src/auth/decorators/auth.decorater';
import { AllExceptionsFilter } from './rpc-exception.filter';
import { CreateUserDto } from 'shared/libs/src/dto/user-service/create-user.dto';
import { CreateRoleDto } from 'shared/libs/src/dto/roles/create-role.dto';

@Controller()
@UseFilters(AllExceptionsFilter)
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
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
}
