import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDTO } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    return await this.dbService.tracks.getOneById(id);
  }

  async findMany() {
    return this.dbService.tracks.getAll();
  }

  async create(createTrackDTO: CreateTrackDTO) {
    return await this.dbService.tracks.create(createTrackDTO);
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO) {
    return await this.dbService.tracks.update(id, updateTrackDTO);
  }

  async delete(id: string) {
    return await this.dbService.tracks.delete(id);
  }
}
