import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
