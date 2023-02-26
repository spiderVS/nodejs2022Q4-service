import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import YAML = require('yamljs');
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const PORT = parseInt(process.env.PORT, 10) || 4000;
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(LoggingService));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(PORT);
}
bootstrap();

// setTimeout(() => Promise.reject(new Error('unhandledRejection test')), 5000);
// setTimeout(() => {
//   throw new Error('uncaughtException test');
// }, 10000);
