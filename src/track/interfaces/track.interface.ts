import { CreateTrack } from './create-track.interface';

export interface Track extends CreateTrack {
  id: string; // uuid v4
}
