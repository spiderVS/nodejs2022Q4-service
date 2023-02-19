import { AlbumEntity } from 'src/album/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
