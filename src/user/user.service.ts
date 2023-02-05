import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { UpdatePassword } from './interfaces/update-user-password.interface';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    const user = await this.dbService.users.getOneById(id);
    if (!user) {
      const notFoundError = new Error(`User with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return new UserDTO({ ...user });
  }

  async findMany() {
    const users = await this.dbService.users.getAll();
    return users.map((el) => new UserDTO({ ...el }));
  }

  async create(createUserDTO: CreateUserDTO) {
    const createdUser = await this.dbService.users.create(createUserDTO);
    return new UserDTO({ ...createdUser });
  }

  async update(id: string, updateUserDTO: UpdatePassword) {
    const { oldPassword } = updateUserDTO;
    const userForUpdate = await this.dbService.users.getOneById(id);
    if (!userForUpdate) {
      const notFoundError = new Error(`User with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    } else if (userForUpdate.password !== oldPassword) {
      const incorrectPasswordError = new Error('Incorrect oldPassword');
      incorrectPasswordError.name = 'INVALID_PASSWORD';
      throw incorrectPasswordError;
    }
    const updatedUser = await this.dbService.users.update(id, updateUserDTO);

    return new UserDTO({ ...updatedUser });
  }

  async delete(id: string) {
    const deletedUser = await this.dbService.users.delete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return;
  }
}
