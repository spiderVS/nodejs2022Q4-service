import { CreateAlbum } from './create-album.interface';

export interface Album extends CreateAlbum {
  id: string; // uuid v4
}
