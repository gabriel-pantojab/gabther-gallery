export interface PhotoDB {
	id: number;
	created_at: string;
	name: string;
	url_image: string;
	id_album: number | null;
}
