import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  // migrationsRun: false,
  logging: true,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrations: [
    // __dirname + '/migration/**/*.ts',
    // __dirname + '/migration/**/*.js',
  ],
  synchronize: true,
  // cli: {
  //   migrationsDir: 'src/migration',
  // },
} as DataSourceOptions;
