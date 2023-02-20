import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('favTrackId')
export class FavTrackEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => TrackEntity, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  track: TrackEntity;
}
