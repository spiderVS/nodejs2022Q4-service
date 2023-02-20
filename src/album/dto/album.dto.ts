import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from '../interfaces/album.interface';

export class AlbumDTO implements Album {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

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
