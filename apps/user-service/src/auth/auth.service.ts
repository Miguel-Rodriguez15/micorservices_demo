import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });

      if (!user) {
        throw new RpcException({
          message: 'Invalid credentials',
          statusCode: 401,
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new RpcException({
          message: 'Invalid credentials',
          statusCode: 401,
        });
      }

      return {
        token: this.getJwtToken({
          id: user.id,
        }),
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      // Si es un error de base de datos u otro error técnico
      throw new RpcException({
        message: 'Authentication error',
        statusCode: 500,
      });
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
