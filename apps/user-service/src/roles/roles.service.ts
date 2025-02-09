import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { RpcException } from '@nestjs/microservices';
import { CreateRoleDto } from 'shared/libs/src/dto/roles/create-role.dto';
import { UpdateRoleDto } from 'shared/libs/src/dto/roles/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: string) {
    try {
      const role = await this.rolesRepository.findOneBy({ id });

      if (!role) {
        throw new RpcException({
          message: `Role with ID "${id}" not found`,
          statusCode: 404,
        });
      }

      return role;
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
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      const role = await this.rolesRepository.findOneBy({ id });
      if (!role) {
        throw new NotFoundException(`Role with ID "${id}" not found`);
      }

      this.rolesRepository.merge(role, updateRoleDto);
      return this.rolesRepository.save(role);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
  }
}
