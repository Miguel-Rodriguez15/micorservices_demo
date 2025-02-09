import { Module } from '@nestjs/common';
import { AppController } from './api-gateway.controller';
import { AppService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'apps/user-service/src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/user-service/src/entities/user.entity';
import { Role } from 'apps/user-service/src/roles/entities/role.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'microservices_users',
      entities: [User, Role],
      synchronize: true,
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4000,
        },
      },
    ]),
    TypeOrmModule.forFeature([User, Role]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApiGatewayModule {}
