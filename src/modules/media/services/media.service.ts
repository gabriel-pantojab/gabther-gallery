import { PostgrestError } from '@supabase/supabase-js';
import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import { CreateMediaRequest } from '@/core/types/dto/request/create-media-request';
import { UpdateFavorite } from '@/core/types/dto/request/update-favorite.request';
import type { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { StorageService } from '@/core/service/storage.service';

export class MediaService {
	static #instance: MediaService;

	private readonly _RESOURCE_NAME: string = 'photo';
	private readonly _STORAGE_NAME: string = 'photos';

	private constructor() {}

	public static getInstance(): MediaService {
		if (MediaService.#instance === undefined) {
			MediaService.#instance = new MediaService();
		}
		return MediaService.#instance;
	}

	public async find(id: number): Promise<PhotoResponse | null> {
		const { data, error } = await supabase
			.from(this._RESOURCE_NAME)
			.select('*')
			.eq('id', id)
			.single();

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async create(request: CreateMediaRequest): Promise<void> {
		const { error } = await supabase.from(this._RESOURCE_NAME).insert(request);

		if (error !== null) {
			throw new SupabaseError(error);
		}
	}

	public async bulkCreate(data: CreateMediaRequest[]): Promise<Array<void>> {
		const promises = data.map(request => this.create(request));
		try {
			return await Promise.all(promises);
		} catch (error: any) {
			throw new SupabaseError(error);
		}
	}

	public async delete(id: number): Promise<void> {
		const { error } = await supabase
			.from(this._RESOURCE_NAME)
			.delete()
			.eq('id', id);

		if (error !== null) {
			throw new SupabaseError(error);
		}
	}

	public async findAll(): Promise<PhotoResponse[]> {
		const { data, error } = await supabase
			.from(this._RESOURCE_NAME)
			.select('*')
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async findFavorites(): Promise<PhotoResponse[]> {
		const { data, error } = await supabase
			.from(this._RESOURCE_NAME)
			.select('*')
			.eq('favorite', true)
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async findAllAlbums(): Promise<AlbumResponse[]> {
		const { data, error } = await supabase
			.from('album')
			.select('*')
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async insertPhotoToAlbum(
		idPhoto: number,
		idAlbum: number,
	): Promise<void> {
		const { error } = await supabase
			.from('photo_album')
			.insert({ id_photo: idPhoto, id_album: idAlbum });
		if (error !== null) {
			throw new SupabaseError(error);
		}
	}

	public async insertPhotosToAlbum(ids: number[], albumId: number) {
		try {
			const promises = ids.map(async id => {
				await this.insertPhotoToAlbum(id, albumId);
			});
			await Promise.all(promises);
		} catch (error) {
			throw new SupabaseError(error as PostgrestError);
		}
	}

	public async updateFavorite(
		request: UpdateFavorite,
	): Promise<PhotoResponse | null> {
		const { photo_id, is_favorite } = request;
		const { data, error } = await supabase
			.from(this._RESOURCE_NAME)
			.update({ favorite: is_favorite })
			.eq('id', photo_id)
			.select()
			.single();

		if (error !== null) {
			throw new SupabaseError(error);
		}

		return data;
	}

	public async deleteFromStorage(name: string): Promise<void> {
		return StorageService.getInstance().delete(this._STORAGE_NAME, name);
	}

	public async uploadPhoto(file: File): Promise<{ path: string } | null> {
		return StorageService.getInstance().upload(this._STORAGE_NAME, file);
	}

	public async bulkUploadMedia(
		files: File[],
	): Promise<Array<{ path: string } | null>> {
		return StorageService.getInstance().bulkUpload(this._STORAGE_NAME, files);
	}
}
