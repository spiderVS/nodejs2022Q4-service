import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { LoggingService } from 'src/logger/logging.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, LoggingService],
})
export class AlbumModule {}
