import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/interfaces/album.interface';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/interfaces/track.interface';
import { CreateArtistDTO } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    return await this.dbService.artists.getOneById(id);
  }

  async findMany() {
    return this.dbService.artists.getAll();
  }

  async create(createArtistDTO: CreateArtistDTO) {
    return await this.dbService.artists.create(createArtistDTO);
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO) {
    return await this.dbService.artists.update(id, updateArtistDTO);
  }

  async delete(id: string) {
    const deletedArtist = await this.dbService.artists.delete(id);

    const relatedAlbums = await this.dbService.albums.getMany<
      Album,
      'artistId'
    >('artistId', id);
    relatedAlbums.forEach(
      async (el) =>
        await this.dbService.albums.update(el.id, { ...el, artistId: null }),
    );

    const relatedTracks = await this.dbService.tracks.getMany<
      Track,
      'artistId'
    >('artistId', id);
    relatedTracks.forEach(
      async (el) =>
        await this.dbService.tracks.update(el.id, { ...el, artistId: null }),
    );

    return deletedArtist;
  }
}
