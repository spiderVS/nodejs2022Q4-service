import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
