import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDTO } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    const track = await this.dbService.tracks.getOneById(id);
    if (!track) {
      const notFoundError = new Error(`Track with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return track;
  }

  async findMany() {
    return this.dbService.tracks.getAll();
  }

  async create(createTrackDTO: CreateTrackDTO) {
    return await this.dbService.tracks.create(createTrackDTO);
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO) {
    const updatedTrack = await this.dbService.tracks.update(id, updateTrackDTO);
    if (!updatedTrack) {
      const notFoundError = new Error(`Track with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return updatedTrack;
  }

  async delete(id: string) {
    const deletedTrack = await this.dbService.tracks.delete(id);
    if (!deletedTrack) {
      throw new Error(`Track with id ${id} not found`);
    }
    await this.dbService.favourites.deleteFrom('tracks', id);
    return;
  }
}
