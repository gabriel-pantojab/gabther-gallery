export interface Photo {
	id: number;
	createdAt: string;
	name: string;
	urlImage: string;
	idAlbum: number | null;
	favorite: boolean;
}
