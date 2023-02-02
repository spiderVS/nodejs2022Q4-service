import { DbModule } from './user/db/db.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
