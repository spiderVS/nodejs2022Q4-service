export interface CreateAlbum {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
