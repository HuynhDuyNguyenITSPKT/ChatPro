import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Lỗi hệ thống';

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resMessage = (exceptionResponse as any).message;
        if (Array.isArray(resMessage)) {
          message = resMessage.join(', ');
        } else if (typeof resMessage === 'string') {
          message = resMessage;
        } else {
          message = exception.message || 'Lỗi hệ thống';
        }
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}
