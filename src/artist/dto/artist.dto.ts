import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Artist } from '../interfaces/artist.interface';

export class ArtistDTO implements Artist {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly grammy: boolean;
}
