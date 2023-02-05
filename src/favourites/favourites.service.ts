import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Favorites } from './interfaces/favourites.interface';

@Injectable()
export class FavouritesService {
  constructor(private dbService: DbService) {}

  async getAll() {
    const favsIds = await this.dbService.favourites.getAll();
    const artists = await Promise.all(
      favsIds.artists.map(
        async (el) => await this.dbService.artists.getOneById(el),
      ),
    );

    const albums = await Promise.all(
      favsIds.albums.map(
        async (el) => await this.dbService.albums.getOneById(el),
      ),
    );

    const tracks = await Promise.all(
      favsIds.tracks.map(
        async (el) => await this.dbService.tracks.getOneById(el),
      ),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTo(type: keyof Favorites, id: string) {
    if (await this.isEntityExist(type, id)) {
      await this.dbService.favourites.addTo(type, id);
    } else {
      throw new Error(`Entity to add with id ${id} doesn't exist`);
    }
    return `Entity with id ${id} added to favorites ${type}`;
  }

  async deleteFrom(type: keyof Favorites, id: string) {
    const isIdInFavourites = this.dbService.favourites.isAlreadyExist(type, id);
    if (!isIdInFavourites) {
      throw new Error(`Entity with id ${id} is not favourite`);
    }
    await this.dbService.favourites.deleteFrom(type, id);
    return;
  }

  private async isEntityExist(type: keyof Favorites, id: string) {
    const entity = await this.dbService[type].getOneById(id);
    return !!entity;
  }
}
