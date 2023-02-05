import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDTO {
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
