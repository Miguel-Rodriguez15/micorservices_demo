import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger('API Gateway');
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.port ?? 3000);
  logger.log('API Gateway is running on port 3000');
}
bootstrap();
