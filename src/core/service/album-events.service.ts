import { AlbumResponse } from '../types/dto/response/album.response';
import { DatabaseEventsService } from './database-events.service';

export class AlbumEventsService extends DatabaseEventsService<AlbumResponse> {
	static #instance: AlbumEventsService;

	public static getInstance(): AlbumEventsService {
		if (!AlbumEventsService.#instance) {
			AlbumEventsService.#instance = new AlbumEventsService();
		}
		return AlbumEventsService.#instance;
	}

	private constructor() {
		super('public', 'album');
	}
}
