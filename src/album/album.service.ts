import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/interfaces/track.interface';
import { CreateAlbumDTO } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    const album = await this.dbService.albums.getOneById(id);
    if (!album) {
      const notFoundError = new Error(`Album with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return album;
  }

  async findMany() {
    return this.dbService.albums.getAll();
  }

  async create(createAlbumDTO: CreateAlbumDTO) {
    return await this.dbService.albums.create(createAlbumDTO);
  }

  async update(id: string, updateAlbumDTO: CreateAlbumDTO) {
    const updatedAlbum = await this.dbService.albums.update(id, updateAlbumDTO);
    if (!updatedAlbum) {
      const notFoundError = new Error(`Album with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return updatedAlbum;
  }

  async delete(id: string) {
    const deletedAlbum = await this.dbService.albums.delete(id);
    if (!deletedAlbum) {
      throw new Error(`Album with id ${id} not found`);
    }

    const relatedTracks = await this.dbService.tracks.getMany<Track, 'albumId'>(
      'albumId',
      id,
    );

    relatedTracks.forEach(
      async (el) =>
        await this.dbService.tracks.update(el.id, { ...el, albumId: null }),
    );

    await this.dbService.favourites.deleteFrom('albums', id);

    return;
  }
}
