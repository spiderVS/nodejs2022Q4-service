import { CreateArtist } from './create-artist.interface';

export interface Artist extends CreateArtist {
  id: string; // uuid v4
}
