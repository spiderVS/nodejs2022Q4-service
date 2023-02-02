import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DbService } from './db/db.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private dbService: DbService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.dbService.users.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    try {
      return await this.dbService.users.getOneById(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
