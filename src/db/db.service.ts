import { Injectable } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { CreateUser } from '../user/interfaces/create-user.interface';
import { UpdatePassword } from '../user/interfaces/update-user-password.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from '../user/dto/user.dto';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { Album } from 'src/album/interfaces/album.interface';

class DBEntity<T extends { id: string }> {
  entities: T[] = [];

  async getOne<T, K extends keyof T>(field: string, value: T[K]) {
    const entity = this.entities.find((el) => el[field] === value);
    if (!entity) {
      const notFoundError = new Error(
        `Entity with ${field} ${value} not found`,
      );
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return entity;
  }

  async getOneById(id: string) {
    const entity = this.entities.find((el: T) => el.id === id);
    if (!entity) {
      const notFoundError = new Error(`Entity with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return entity;
  }

  async getMany<T, K extends keyof T>(field: string, value: T[K]) {
    const entities = this.entities.filter((el) => el[field] === value);
    return entities;
  }

  async getAll() {
    return this.entities;
  }

  public async create(dto: any) {
    const created: T = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }

  public async update(id: string, changeDto: any) {
    const idx = this.entities.findIndex((el) => el.id === id);
    if (idx === -1) {
      const notFoundError = new Error(`Entity with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    const changed: T = {
      ...this.entities[idx],
      ...changeDto,
    };
    this.entities.splice(idx, 1, changed);
    return changed;
  }

  public async delete(id: string) {
    const idx = this.entities.findIndex((el) => el.id === id);
    if (idx === -1) {
      throw new Error(`Entity with id ${id} not found`);
    }
    this.entities.splice(idx, 1);
  }
}

class DBUsers extends DBEntity<User> {
  public async getOneById(id: string) {
    const user = await super.getOneById(id);
    return new UserDTO({ ...user });
  }

  public async getAll() {
    const users = await super.getAll();
    return users.map((el) => new UserDTO({ ...el }));
  }

  public async create(dto: CreateUser) {
    const created: User = {
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      id: uuidv4(),
    };
    this.entities.push(created);
    return new UserDTO({ ...created });
  }

  public async update(id: string, changeDto: UpdatePassword) {
    const { oldPassword, newPassword } = changeDto;
    const idx = this.entities.findIndex((el) => el.id === id);
    if (idx === -1) {
      const notFoundError = new Error(`User with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    } else if (this.entities[idx].password !== oldPassword) {
      const incorrectPasswordError = new Error('Incorrect oldPassword');
      incorrectPasswordError.name = 'INVALID_PASSWORD';
      throw incorrectPasswordError;
    }
    const changed: User = {
      ...this.entities[idx],
      password: newPassword,
      version: this.entities[idx].version + 1,
      updatedAt: Date.now(),
    };
    this.entities.splice(idx, 1, changed);
    return new UserDTO({ ...changed });
  }

  public async delete(id: string) {
    const idx = this.entities.findIndex((el) => el.id === id);
    if (idx === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.entities.splice(idx, 1);
  }
}

class DBArtists extends DBEntity<Artist> {}
class DBTracks extends DBEntity<Track> {}
class DBAlbums extends DBEntity<Album> {}

@Injectable()
export class DbService {
  public users = new DBUsers();
  public artists = new DBArtists();
  public tracks = new DBTracks();
  public albums = new DBAlbums();
  // public favourites = new Entity();
}
