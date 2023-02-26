import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionsFilter } from 'src/exception-filter/exception.filter';
import { LoggingService } from './logging.service';

@Module({
  imports: [],
  providers: [
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilter,
    },
  ],
})
export class LoggerModule {}
