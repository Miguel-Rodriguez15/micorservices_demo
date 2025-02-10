import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RolesModule } from '../roles/roles.module';
import { User } from '../../src/entities/user.entity';
import { Role } from '../../src/roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    RolesModule,
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        secret: 'secret', // Replace with your actual secret
        signOptions: {
          expiresIn: '8h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
