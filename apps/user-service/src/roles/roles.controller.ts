import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from 'shared/libs/src/dto/roles/create-role.dto';
import { UpdateRoleDto } from 'shared/libs/src/dto/roles/update-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'create_role' })
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern({ cmd: 'find_all_roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_role' })
  findOne(@Payload() id: string) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern('updateRole')
  update(@Payload() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern({ cmd: 'remove_role' })
  remove(@Payload() id: string) {
    return this.rolesService.remove(id);
  }
}
