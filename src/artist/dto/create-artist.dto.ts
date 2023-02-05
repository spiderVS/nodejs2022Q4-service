import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtist } from '../interfaces/create-artist.interface';

export class CreateArtistDTO implements CreateArtist {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
