import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { FavAlbumEntity } from './entities/favAlbumId.entity';
import { FavArtistEntity } from './entities/favAristId.entity';
import { FavTrackEntity } from './entities/favTrackId.entity';
import { Favorites } from './interfaces/favourites.interface';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavArtistEntity)
    private favArtistsRepository: Repository<FavArtistEntity>,
    @InjectRepository(FavTrackEntity)
    private favTracksRepository: Repository<FavTrackEntity>,
    @InjectRepository(FavAlbumEntity)
    private favAlbumsRepository: Repository<FavAlbumEntity>,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const favArtistsIds = await this.favArtistsRepository.find();
    const favAlbumsIds = await this.favAlbumsRepository.find();
    const favTracksIds = await this.favTracksRepository.find();

    const artists = await Promise.all(
      favArtistsIds.map(
        async (el) =>
          await this.artistRepository.findOne({ where: { id: el.id } }),
      ),
    );
    const albums = await Promise.all(
      favAlbumsIds.map(
        async (el) =>
          await this.albumRepository.findOne({ where: { id: el.id } }),
      ),
    );
    const tracks = await Promise.all(
      favTracksIds.map(
        async (el) =>
          await this.trackRepository.findOne({ where: { id: el.id } }),
      ),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTo(type: keyof Favorites, id: string) {
    try {
      switch (type) {
        case 'albums':
          await this.favAlbumsRepository.save({ id } as FavAlbumEntity);
          break;

        case 'tracks':
          await this.favTracksRepository.save({ id } as FavTrackEntity);
          break;

        case 'artists':
          await this.favArtistsRepository.save({ id } as FavArtistEntity);
          break;

        default:
          break;
      }
    } catch (error) {
      throw new Error(`Entity to add with id ${id} doesn't exist`);
    }

    return `Entity with id ${id} added to favorites ${type}`;
  }

  async deleteFrom(type: keyof Favorites, id: string) {
    switch (type) {
      case 'albums':
        const deletedFavAlbum = await this.favAlbumsRepository.delete(id);
        if (deletedFavAlbum.affected === 0) {
          throw new Error(`Album with id ${id} is not favourite`);
        }
        break;

      case 'tracks':
        const deletedFavTrack = await this.favTracksRepository.delete(id);
        if (deletedFavTrack.affected === 0) {
          throw new Error(`Track with id ${id} is not favourite`);
        }
        break;

      case 'artists':
        const deletedFavArtist = await this.favArtistsRepository.delete(id);
        if (deletedFavArtist.affected === 0) {
          throw new Error(`Artist with id ${id} is not favourite`);
        }
        break;

      default:
        break;
    }
    return;
  }
}
