import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import { LoveNoteResponse } from '@/core/types/dto/response/love-note.response';

export class LoveNoteService {
	static #instance: LoveNoteService;

	private constructor() {}

	public static getInstance(): LoveNoteService {
		if (!LoveNoteService.#instance) {
			LoveNoteService.#instance = new LoveNoteService();
		}
		return LoveNoteService.#instance;
	}

	public async findSentLoveNotes(
		authorId: string,
	): Promise<LoveNoteResponse[]> {
		const { data, error } = await supabase
			.from('love_note')
			.select('*')
			.eq('author', authorId)
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async findReceivedLoveNotes(
		userId: string,
	): Promise<LoveNoteResponse[]> {
		const { data, error } = await supabase
			.from('love_note')
			.select('*')
			.eq('recipient', userId)
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}
}
