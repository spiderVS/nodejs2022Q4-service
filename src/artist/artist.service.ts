import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/interfaces/album.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Repository } from 'typeorm';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (!artist) {
      const notFoundError = new Error(`Artist with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return artist;
  }

  async findMany() {
    return this.artistRepository.find();
  }

  async create(createArtistDTO: CreateArtistDTO) {
    const createdArtist = this.artistRepository.create(createArtistDTO);
    return await this.artistRepository.save(createdArtist);
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO) {
    const artistForUpdate = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!artistForUpdate) {
      const notFoundError = new Error(`Artist with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    const updatedArtist = await this.artistRepository.save(
      Object.assign(artistForUpdate, updateArtistDTO),
    );
    return updatedArtist;
  }

  async delete(id: string) {
    const deletedArtist = await this.artistRepository.delete(id);
    if (deletedArtist.affected === 0) {
      throw new Error(`Artist with id ${id} not found`);
    }

    // const relatedAlbums = await this.dbService.albums.getMany<
    //   Album,
    //   'artistId'
    // >('artistId', id);
    // relatedAlbums.forEach(
    //   async (el) =>
    //     await this.dbService.albums.update(el.id, { ...el, artistId: null }),
    // );

    // const relatedTracks = await this.dbService.tracks.getMany<
    //   Track,
    //   'artistId'
    // >('artistId', id);
    // relatedTracks.forEach(
    //   async (el) =>
    //     await this.dbService.tracks.update(el.id, { ...el, artistId: null }),
    // );

    // await this.dbService.favourites.deleteFrom('artists', id);

    return;
  }
}
