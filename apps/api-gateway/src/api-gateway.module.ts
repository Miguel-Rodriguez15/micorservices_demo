import { Module } from '@nestjs/common';
import { AppController } from './api-gateway.controller';
import { AppService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApiGatewayModule {}
