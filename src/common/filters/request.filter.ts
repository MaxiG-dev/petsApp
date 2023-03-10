import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { DataBaseException } from './database.exception';

@Catch(DataBaseException)
export class RequestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message;
    const cause = exception.cause;
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      message,
      cause,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
