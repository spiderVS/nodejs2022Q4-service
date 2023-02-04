import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Track } from '../interfaces/track.interface';

export class TrackDTO implements Track {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsUUID()
  @IsOptional()
  readonly artistId: string | null;

  @IsUUID()
  @IsOptional()
  readonly albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;
}
