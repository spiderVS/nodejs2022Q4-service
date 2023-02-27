import { Injectable } from '@nestjs/common';
import { LoggingService } from './logger/logging.service';

@Injectable()
export class UncaughtErrorService {
  constructor(private logger: LoggingService) {
    process.on('uncaughtException', (err) => {
      logger.error(err);
      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      logger.error(err);
      process.exit(1);
    });
  }
}
