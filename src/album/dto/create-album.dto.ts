import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateAlbum } from '../interfaces/create-album.interface';

export class CreateAlbumDTO implements CreateAlbum {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsUUID()
  @IsOptional()
  readonly artistId: string | null;
}
