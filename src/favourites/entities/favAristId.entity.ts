import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('favAristId')
export class FavArtistEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  artist: ArtistEntity;
}
