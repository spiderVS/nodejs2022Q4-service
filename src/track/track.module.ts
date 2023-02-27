import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { LoggingService } from 'src/logger/logging.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService, LoggingService],
})
export class TrackModule {}
