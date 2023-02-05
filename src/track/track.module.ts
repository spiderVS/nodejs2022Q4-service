import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
