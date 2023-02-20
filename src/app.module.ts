import { FavouritesModule } from './favourites/favourites.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../db/typeorm.config';

@Module({
  imports: [
    FavouritesModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
