import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('UserService');

  const app = await NestFactory.createMicroservice(UserServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000,
    },
  });

  await app.listen();
  logger.log('User Microservice is listening');
}
bootstrap();
