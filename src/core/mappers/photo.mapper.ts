import type { PhotoResponse } from '../types/dto/response/photo.response';
import type { Photo } from '../types/domain/photo.model';

function single(photo: PhotoResponse): Photo {
	return {
		id: photo.id,
		name: photo.name,
		urlImage: photo.url_image,
		favorite: photo.favorite,
		idAlbum: photo.id_album,
		createdAt: photo.created_at,
	};
}

function many(photos: PhotoResponse[]): Photo[] {
	return photos.map((photo: PhotoResponse) => single(photo));
}

export const PhotoAdapter = { single, many };
