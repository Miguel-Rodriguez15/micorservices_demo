import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('InventoryService');

  const app = await NestFactory.createMicroservice(InventoryServiceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4001,
    },
  });
  await app.listen();
  logger.log('inventory Microservice is listening');
}
bootstrap();
