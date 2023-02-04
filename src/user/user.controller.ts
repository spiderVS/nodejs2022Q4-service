import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdatePasswordDTO } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private dbService: DbService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return this.dbService.users.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    try {
      return await this.dbService.users.getOneById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.dbService.users.create(createUserDTO);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDTO: UpdatePasswordDTO,
  ) {
    try {
      return await this.dbService.users.update(id, updateUserDTO);
    } catch (error) {
      if (error.name === 'NOT_FOUND') {
        throw new NotFoundException(error.message);
      } else if (error.name === 'INVALID_PASSWORD') {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.dbService.users.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }
}
