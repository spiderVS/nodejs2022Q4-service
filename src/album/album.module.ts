import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
