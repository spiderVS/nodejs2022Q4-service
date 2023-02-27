import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePassword } from './interfaces/update-user-password.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      const notFoundError = new Error(`User with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return user.toResponse();
  }

  async findMany() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async create(createUserDTO: CreateUserDTO) {
    /* Additional check
    const { login } = createUserDTO;
    const existedUser = await this.userRepository.findOne({
      where: { login: login },
    });
    if (existedUser) {
      const userExistError = new Error(
        `User with login ${login} already exists`,
      );
      userExistError.name = 'ENTITY_ALREADY_EXIST';
      throw userExistError;
    }
  */

    const createdUser = this.userRepository.create(createUserDTO);
    return (await this.userRepository.save(createdUser)).toResponse();
  }
  async update(id: string, updateUserDTO: UpdatePassword) {
    const { oldPassword, newPassword } = updateUserDTO;

    const userForUpdate = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!userForUpdate) {
      const notFoundError = new Error(`User with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    } else if (userForUpdate.password !== oldPassword) {
      const incorrectPasswordError = new Error('Incorrect oldPassword');
      incorrectPasswordError.name = 'INVALID_PASSWORD';
      throw incorrectPasswordError;
    }

    const updatedUser = await this.userRepository.save(
      Object.assign(userForUpdate, { password: newPassword }),
    );

    return updatedUser.toResponse();
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (deletedUser.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return;
  }
}
