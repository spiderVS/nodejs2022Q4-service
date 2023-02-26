import { ConsoleLoggerOptions, Injectable, Scope } from '@nestjs/common';
import { LoggerService, ConsoleLogger } from '@nestjs/common';
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

  // error(message: string, stack?: string, context?: string) {
  //   super.error.apply(this, [message, stack, context]);
  // }

  // warn(message: string, context?: string) {
  //   super.warn.apply(this, [message, context]);
  // }

  log(message: string) {
    super.log.apply(this, [message]);
  }

  // verbose(message: string, context?: string) {
  //   super.debug.apply(this, [message, context]);
  // }

  // debug(message: string, context?: string) {
  //   super.debug.apply(this, [message, context]);
  // }
}
