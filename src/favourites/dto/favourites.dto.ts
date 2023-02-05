import { IsArray, IsNotEmpty } from 'class-validator';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { FavoritesRepsonse } from '../interfaces/favourites-response.interface';

export class FavouritesDTO implements FavoritesRepsonse {
  @IsNotEmpty()
  @IsArray()
  readonly artists: Artist[];

  @IsNotEmpty()
  @IsArray()
  readonly albums: Album[];

  @IsNotEmpty()
  @IsArray()
  readonly tracks: Track[];
}
