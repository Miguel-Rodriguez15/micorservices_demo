import { NestFactory } from '@nestjs/core';
import { BillingServiceModule } from './billing-service.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('BillingService');

  const app = await NestFactory.createMicroservice(BillingServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4004,
    },
  });
  await app.listen();
  logger.log('Billing Microservice is listening');
}
bootstrap();
