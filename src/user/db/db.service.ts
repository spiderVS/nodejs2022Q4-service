import { Injectable } from '@nestjs/common';
import { User } from '../../user/interfaces/user.interface';
import { CreateUser } from '../interfaces/create-user.interface';
import { UpdatePassword } from '../interfaces/update-user-password.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from '../dto/user.dto';

class DBEntity<T extends { id: string }> {
  entities: T[] = [];

  async getOneById(id: string) {
    const entity = this.entities.find((el: T) => el.id === id);
    if (!entity) {
      const notFoundError = new Error(`Entity with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return new UserDTO({ ...entity });
  }

  async getAll() {
    return this.entities.map((el) => new UserDTO({ ...el }));
  }
}

class DBUsers extends DBEntity<User> {
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

@Injectable()
export class DbService {
  public users = new DBUsers();
  // public artists = new Entity();
  // public tracks = new Entity();
  // public albums = new Entity();
  // public favourites = new Entity();
}
