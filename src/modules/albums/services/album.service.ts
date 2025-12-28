import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import { CreateAlbumRequest } from '@/core/types/dto/request/create-album.request';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';

export class AlbumService {
	static #instance: AlbumService;

	private constructor() {}

	public static getInstance(): AlbumService {
		if (!AlbumService.#instance) {
			AlbumService.#instance = new AlbumService();
		}
		return AlbumService.#instance;
	}

	public async find(albumId: number): Promise<AlbumResponse> {
		const { data, error } = await supabase
			.from('album')
			.select('*')
			.eq('id', albumId)
			.single();

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
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

	public async findMedia(id: number): Promise<PhotoResponse[]> {
		const { data, error } = await supabase
			.from('photo_album')
			.select('id_photo, photo (id, created_at, name, url_image, favorite)')
			.eq('id_album', id)
			.order('created_at', { referencedTable: 'photo', ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data.map((item: any) => item.photo);
	}

	public async findSubAlbums(parentId: number): Promise<AlbumResponse[]> {
		const { data, error } = await supabase
			.from('album')
			.select('*')
			.eq('parent_id', parentId)
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async uploadAlbumCover(file: File, name: string): Promise<any> {
		const { data: storageData, error } = await supabase.storage
			.from('albums')
			.upload(`${name}/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error !== null) {
			throw error;
		}

		const { data: path } = supabase.storage
			.from('albums')
			.getPublicUrl(storageData.path);

		return { url: path.publicUrl };
	}
}
