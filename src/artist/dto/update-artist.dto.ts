import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDTO } from './create-artist.dto';

export class UpdateArtistDTO extends PartialType(CreateArtistDTO) {
  // @IsOptional()
  // @IsNotEmpty()
  // @IsString()
  // readonly name: string;
  // @IsOptional()
  // @IsNotEmpty()
  // @IsBoolean()
  // readonly grammy: boolean;
}
