import { DbService } from './db.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
