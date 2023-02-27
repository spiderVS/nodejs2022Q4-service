import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../../logging.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: LoggingService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        this.logger.setContext('RESPONSE ->');
        this.logger.log(
          `statusCode: ${
            context.switchToHttp().getResponse().statusCode
          } body: ${JSON.stringify(data)}`,
        );
      }),
    );
  }
}
