import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Artist } from '../interfaces/artist.interface';

export class ArtistDTO implements Artist {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
