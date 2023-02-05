import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
