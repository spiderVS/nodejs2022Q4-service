import { ValidationPipe } from '@nestjs/common';
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
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(PORT);
}
bootstrap();
