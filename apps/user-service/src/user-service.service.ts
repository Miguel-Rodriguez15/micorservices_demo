import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './roles/entities/role.entity';
import { JwtPayload } from './auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/libs/src/dto/user-service/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto, role?: string) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new RpcException({
          message: 'User with this email already exists',
          statusCode: 400,
        });
      }

      const userRoles = await this.roleRepository.find({
        where: {
          name: In(role ? [role] : ['user']),
        },
      });

      if (userRoles.length === 0) {
        throw new RpcException({
          message: 'Invalid role specified',
          statusCode: 400,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, roles, ...userData } = createUserDto;

      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        roles: userRoles,
      });

      await this.usersRepository.save(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;

      return {
        user: result,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);

      if (error instanceof RpcException) {
        throw error;
      }

      if (error.code === '23505') {
        throw new RpcException({
          message: 'User with this email already exists',
          statusCode: 400,
        });
      }

      throw new RpcException({
        message: 'Error creating user',
        statusCode: 500,
      });
    }
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
