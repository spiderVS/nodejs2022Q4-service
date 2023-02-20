import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, TrackEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
