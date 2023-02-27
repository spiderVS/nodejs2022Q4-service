import { IsNotEmpty, IsUUID } from 'class-validator';

export class favArtistId {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;
}
