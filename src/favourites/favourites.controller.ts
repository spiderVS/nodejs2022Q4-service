import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerInterceptor } from 'src/logger/interceptors/res-logger-interceptor/logger.interceptor';
import { FavouritesService } from './favourites.service';

@UseInterceptors(LoggerInterceptor)
@Controller('favs')
export class FavouritesController {
  constructor(private favsService: FavouritesService) {}

  @Get()
  async findAll() {
    return await this.favsService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favsService.addTo('tracks', id);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favsService.addTo('albums', id);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favsService.addTo('artists', id);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete('track/:id')
  async deleteTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.favsService.deleteFrom('tracks', id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }

  @Delete('album/:id')
  async deleteAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.favsService.deleteFrom('albums', id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }

  @Delete('artist/:id')
  async deleteArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      await this.favsService.deleteFrom('artists', id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }
}
