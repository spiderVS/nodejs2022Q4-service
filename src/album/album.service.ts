import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/interfaces/track.interface';
import { CreateAlbumDTO } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    return await this.dbService.albums.getOneById(id);
  }

  async findMany() {
    return this.dbService.albums.getAll();
  }

  async create(createAlbumDTO: CreateAlbumDTO) {
    return await this.dbService.albums.create(createAlbumDTO);
  }

  async update(id: string, updateAlbumDTO: CreateAlbumDTO) {
    return await this.dbService.albums.update(id, updateAlbumDTO);
  }

  async delete(id: string) {
    const deletedAlbum = await this.dbService.albums.delete(id);

    const relatedTracks = await this.dbService.tracks.getMany<Track, 'albumId'>(
      'albumId',
      id,
    );

    relatedTracks.forEach(
      async (el) =>
        await this.dbService.tracks.update(el.id, { ...el, albumId: null }),
    );

    return deletedAlbum;
  }
}
