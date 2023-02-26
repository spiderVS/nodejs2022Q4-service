import {
  Body,
  Controller,
  Delete,
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
import { Response } from 'express';
import { LoggerInterceptor } from 'src/logger/interceptors/res-logger-interceptor/logger.interceptor';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { Album } from './interfaces/album.interface';

@UseInterceptors(LoggerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    try {
      return await this.albumService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() createAlbumDTO: CreateAlbumDTO) {
    try {
      return await this.albumService.create(createAlbumDTO);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDTO: CreateAlbumDTO,
  ) {
    try {
      return await this.albumService.update(id, updateAlbumDTO);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.albumService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }
}
