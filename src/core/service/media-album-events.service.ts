import { PhotoAlbumResponse } from '../types/dto/response/photo-album.response';
import { DatabaseEventsService } from './database-events.service';

export class MediaAlbumEventsService extends DatabaseEventsService<PhotoAlbumResponse> {
	static #instance: MediaAlbumEventsService;

	public static getInstance(): MediaAlbumEventsService {
		if (!MediaAlbumEventsService.#instance) {
			MediaAlbumEventsService.#instance = new MediaAlbumEventsService();
		}
		return MediaAlbumEventsService.#instance;
	}

	private constructor() {
		super('public', 'photo_album');
	}
}
