import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Module({
  imports: [],
  providers: [LoggingService],
})
export class LoggerModule {}
