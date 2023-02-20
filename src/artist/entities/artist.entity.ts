import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavArtistEntity } from 'src/favourites/entities/favAristId.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  @OneToOne(() => FavArtistEntity, (favId) => favId.artist)
  favArtistId: string;
}
