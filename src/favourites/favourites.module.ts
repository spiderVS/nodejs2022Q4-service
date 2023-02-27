import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavArtistEntity } from './entities/favAristId.entity';
import { FavAlbumEntity } from './entities/favAlbumId.entity';
import { FavTrackEntity } from './entities/favTrackId.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { LoggingService } from 'src/logger/logging.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavArtistEntity,
      FavTrackEntity,
      FavAlbumEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService, LoggingService],
})
export class FavouritesModule {}
