import { LogLevel } from '@nestjs/common';

interface LogLevels {
  [key: string]: LogLevel[];
}

export const LOG_LEVELS: LogLevels = {
  0: ['error'],
  1: ['error', 'warn'],
  2: ['error', 'warn', 'log'],
  3: ['error', 'warn', 'log', 'verbose'],
  4: ['error', 'warn', 'log', 'verbose', 'debug'],
};

export const DEFAULT_LOG_LEVEL = '4';
