import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('API Gateway');
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors();

  await app.listen(process.env.port ?? 3000);
  logger.log('API Gateway is running on port 3000');
}
bootstrap();
