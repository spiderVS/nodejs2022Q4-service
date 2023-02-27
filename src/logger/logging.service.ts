import { ConsoleLoggerOptions, Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_LOG_LEVEL, LOG_LEVELS } from './constants';

type NumberLevel = '0' | '1' | '2' | '3' | '4';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService extends ConsoleLogger {
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
  ) {
    let level: NumberLevel = configService.get('LOGGING_LEVEL');
    const levelAsNumber = parseInt(level, 10);
    if (isNaN(levelAsNumber) && levelAsNumber < 0 && levelAsNumber > 4) {
      level = DEFAULT_LOG_LEVEL;
    }
    super(context, {
      ...options,
      logLevels: LOG_LEVELS[level],
    });
  }

  error(message: any, stack?: string) {
    super.error.apply(this, [message, stack]);
  }

  warn(message: any) {
    super.warn.apply(this, [message]);
  }

  log(message: any) {
    super.log.apply(this, [message]);
  }

  verbose(message: any) {
    super.debug.apply(this, [message]);
  }

  debug(message: any) {
    super.debug.apply(this, [message]);
  }
}
