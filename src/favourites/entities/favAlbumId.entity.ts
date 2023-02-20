import { AlbumEntity } from 'src/album/entities/album.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('favAlbumId')
export class FavAlbumEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  album: AlbumEntity;
}
