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
import { CreateTrackDTO } from './dto/create-track.dto';
import { Response } from 'express';
import { Track } from './interfaces/track.interface';
import { TrackService } from './track.service';
import { LoggerInterceptor } from 'src/logger/interceptors/res-logger-interceptor/logger.interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    try {
      return await this.trackService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() createTrackDTO: CreateTrackDTO) {
    try {
      return await this.trackService.create(createTrackDTO);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDTO: CreateTrackDTO,
  ) {
    try {
      return await this.trackService.update(id, updateTrackDTO);
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
      await this.trackService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    res.status(HttpStatus.NO_CONTENT);
  }
}
