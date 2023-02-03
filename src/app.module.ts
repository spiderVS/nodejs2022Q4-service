import { DbModule } from './user/db/db.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DbModule, UserModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
