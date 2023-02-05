import { FavouritesModule } from './favourites/favourites.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FavouritesModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    DbModule,
    UserModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
