import { LoveNoteResponse } from '@/core/types/dto/response/love-note.response';
import { DatabaseEventsService } from './database-events.service';

export class LoveNoteEventsService extends DatabaseEventsService<LoveNoteResponse> {
	static #instance: LoveNoteEventsService;

	public static getInstance(): LoveNoteEventsService {
		if (!LoveNoteEventsService.#instance) {
			LoveNoteEventsService.#instance = new LoveNoteEventsService();
		}
		return LoveNoteEventsService.#instance;
	}

	private constructor() {
		super('public', 'love_note');
	}
}
