import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import { AlbumResponse } from '@/core/types/dto/response/album.response';

export class AlbumService {
	static #instance: AlbumService;

	private constructor() {}

	public static getInstance(): AlbumService {
		if (!AlbumService.#instance) {
			AlbumService.#instance = new AlbumService();
		}
		return AlbumService.#instance;
	}

	public async findAll(filters?: string): Promise<AlbumResponse[]> {
		const query = supabase.from('album').select('*');

		if (filters) {
			const filter = JSON.parse(filters);
			if (filter?.roots) {
				query.is('parent_id', null);
			}
		}

		const { data, error } = await query.order('created_at', {
			ascending: false,
		});

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async findRoots(): Promise<AlbumResponse[]> {
		const filters = JSON.stringify({
			roots: true,
		});
		return this.findAll(filters);
	}
}
