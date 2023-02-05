import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/interfaces/album.interface';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/track/interfaces/track.interface';
import { CreateArtistDTO } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    const artist = await this.dbService.artists.getOneById(id);
    if (!artist) {
      const notFoundError = new Error(`Artist with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return artist;
  }

  async findMany() {
    return this.dbService.artists.getAll();
  }

  async create(createArtistDTO: CreateArtistDTO) {
    return await this.dbService.artists.create(createArtistDTO);
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO) {
    const updatedArtist = await this.dbService.artists.update(
      id,
      updateArtistDTO,
    );
    if (!updatedArtist) {
      const notFoundError = new Error(`Artist with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return updatedArtist;
  }

  async delete(id: string) {
    const deletedArtist = await this.dbService.artists.delete(id);
    if (!deletedArtist) {
      throw new Error(`Artist with id ${id} not found`);
    }

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

    await this.dbService.favourites.deleteFrom('artists', id);

    return;
  }
}
