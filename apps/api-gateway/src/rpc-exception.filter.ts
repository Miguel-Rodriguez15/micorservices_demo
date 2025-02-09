import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception.getError();
    const status =
      typeof error === 'object' && error['status']
        ? error['status']
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      typeof error === 'object' && error['message']
        ? error['message']
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
