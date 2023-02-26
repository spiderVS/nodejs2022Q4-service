import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/logger/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req;
    this.logger.setContext('REQUEST <- ');
    this.logger.log(`${method} ${url} body: ${JSON.stringify(body)}`);
    next();
  }
}
