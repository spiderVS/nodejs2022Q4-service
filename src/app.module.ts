import { FavouritesModule } from './favourites/favourites.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './typeorm.config';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    FavouritesModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    DbModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
