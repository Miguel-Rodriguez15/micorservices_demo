import { NestFactory } from '@nestjs/core';
import { CustomerServiceModule } from './customer-service.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('CustomerService');

  const app = await NestFactory.createMicroservice(CustomerServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4003,
    },
  });
  await app.listen();
  logger.log('Customer Microservice is listening');
}
bootstrap();
