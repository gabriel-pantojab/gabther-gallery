import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import { CreateAlbumRequest } from '@/core/types/dto/request/create-album.request';
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

	public async create(request: CreateAlbumRequest): Promise<void> {
		const { error } = await supabase.from('album').insert({
			name: request.name,
			url_album_cover: request.urlAlbumCover,
			parent_id: request.parentId,
		});

		if (error !== null) {
			throw new SupabaseError(error);
		}
	}

	public async uploadAlbumCover(file: File, name: string): Promise<any> {
		const { data: data1, error } = await supabase.storage
			.from('albums')
			.upload(`${name}/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error !== null) {
			throw error;
		}

		const { data: data2 } = supabase.storage
			.from('albums')
			.getPublicUrl(data1.path);

		return { url: data2.publicUrl };
	}
}
