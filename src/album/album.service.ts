import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) {
      const notFoundError = new Error(`Album with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return album;
  }

  async findMany() {
    return this.albumRepository.find();
  }

  async create(createAlbumDTO: CreateAlbumDTO) {
    const { artistId } = createAlbumDTO;
    try {
      const createdAlbum = this.albumRepository.create(createAlbumDTO);
      return await this.albumRepository.save(createdAlbum);
    } catch (error) {
      const notFoundError = new Error(`Artist with id ${artistId} not exist`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
  }

  async update(id: string, updateAlbumDTO: CreateAlbumDTO) {
    const { artistId } = updateAlbumDTO;
    const albumForUpdate = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (!albumForUpdate) {
      const notFoundError = new Error(`Album with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }

    try {
      const updatedAlbum = await this.albumRepository.save(
        Object.assign(albumForUpdate, updateAlbumDTO),
      );
      return updatedAlbum;
    } catch (error) {
      throw new Error(`Artist with id ${artistId} not exist`);
    }
  }

  async delete(id: string) {
    const deletedAlbum = await this.albumRepository.delete(id);
    if (deletedAlbum.affected === 0) {
      throw new Error(`Album with id ${id} not found`);
    }

    // const relatedTracks = await this.dbService.tracks.getMany<Track, 'albumId'>(
    //   'albumId',
    //   id,
    // );

    // relatedTracks.forEach(
    //   async (el) =>
    //     await this.dbService.tracks.update(el.id, { ...el, albumId: null }),
    // );

    // await this.dbService.favourites.deleteFrom('albums', id);

    return;
  }
}
