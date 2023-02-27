import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logging.service';

interface ErrorBody {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {
    this.logger.setContext('CustomExceptionFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMsg: string =
      exception instanceof HttpException
        ? exception['response']['message']
        : String(exception);

    const errorBody: ErrorBody = {
      statusCode: status,
      message: errorMsg,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (status >= 400 && status < 500) this.warnLog(errorBody);
    else if (status >= 500) this.errorLog(errorBody);

    response.status(status).json(errorBody);
  }

  warnLog(msg: ErrorBody) {
    this.logger.warn(msg);
  }

  errorLog(msg: ErrorBody) {
    this.logger.error(msg);
  }
}
