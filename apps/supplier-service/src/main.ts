import { NestFactory } from '@nestjs/core';
import { SupplierServiceModule } from './supplier-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SupplierServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4002,
    },
  });
  await app.listen();
}
bootstrap();
