import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavAlbumEntity } from 'src/favourites/entities/favAlbumId.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToOne(() => FavAlbumEntity, (favId) => favId.album)
  favAlbumId: string;
}
