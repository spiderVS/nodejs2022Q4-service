import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateArtistDTO } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}

  async findOne(id: string) {
    return await this.dbService.artists.getOneById(id);
  }

  async findMany() {
    return this.dbService.artists.getAll();
  }

  async create(createArtistDTO: CreateArtistDTO) {
    return await this.dbService.artists.create(createArtistDTO);
  }

  async update(id: string, updateArtistDTO: CreateArtistDTO) {
    return await this.dbService.artists.update(id, updateArtistDTO);
  }

  async delete(id: string) {
    return await this.dbService.artists.delete(id);
  }
}
