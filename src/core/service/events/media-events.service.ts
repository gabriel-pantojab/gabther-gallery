import { PhotoResponse } from '../../types/dto/response/photo.response';
import { DatabaseEventsService } from './database-events.service';

export class MediaEventsService extends DatabaseEventsService<PhotoResponse> {
	static #instance: MediaEventsService;

	public static getInstance(): MediaEventsService {
		if (!MediaEventsService.#instance) {
			MediaEventsService.#instance = new MediaEventsService();
		}
		return MediaEventsService.#instance;
	}

	private constructor() {
		super('public', 'photo');
	}
}
