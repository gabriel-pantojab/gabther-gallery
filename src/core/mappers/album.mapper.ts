import { Album } from '@/core/types/domain/album.model';
import { AlbumResponse } from '../types/dto/response/album.response';

function single(album: AlbumResponse): Album {
	return {
		id: album.id,
		name: album.name,
		urlAlbumCover: album.url_album_cover,
		createAt: album.create_at,
	};
}

function many(photos: AlbumResponse[]): Album[] {
	return photos.map((photo: AlbumResponse) => single(photo));
}

export const AlbumMapper = { single, many };
