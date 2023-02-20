import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDTO } from './dto/create-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track) {
      const notFoundError = new Error(`Track with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
    return track;
  }

  async findMany() {
    return await this.trackRepository.find();
  }

  async create(createTrackDTO: CreateTrackDTO) {
    const { artistId } = createTrackDTO;
    try {
      const createdTrack = this.trackRepository.create(createTrackDTO);
      return await this.trackRepository.save(createdTrack);
    } catch (error) {
      const notFoundError = new Error(`Artist with id ${artistId} not exist`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }
  }

  async update(id: string, updateTrackDTO: CreateTrackDTO) {
    const { artistId } = updateTrackDTO;
    const trackForUpdate = await this.trackRepository.findOne({
      where: { id: id },
    });
    if (!trackForUpdate) {
      const notFoundError = new Error(`Track with id ${id} not found`);
      notFoundError.name = 'NOT_FOUND';
      throw notFoundError;
    }

    try {
      const updatedTrack = await this.trackRepository.save(
        Object.assign(trackForUpdate, updateTrackDTO),
      );
      return updatedTrack;
    } catch (error) {
      throw new Error(`Artist with id ${artistId} not exist`);
    }
  }

  async delete(id: string) {
    const deletedTrack = await this.trackRepository.delete(id);
    if (deletedTrack.affected === 0) {
      throw new Error(`Track with id ${id} not found`);
    }
    return;
  }
}
