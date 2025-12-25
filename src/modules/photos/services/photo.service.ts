import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import type { PhotoResponse } from '../api/response/photo.response';
import { CreateRequest } from '../api/request/create-request';
import { UpdateFavorite } from '../api/request/update-favorite.request';

export class PhotoService {
	static #instance: PhotoService;

	private readonly _RESOURCE_NAME: string = 'photo';
	private readonly _STORAGE_NAME: string = 'photos';

	private constructor() {}

	public static getInstance(): PhotoService {
		if (PhotoService.#instance === undefined) {
			PhotoService.#instance = new PhotoService();
		}
		return PhotoService.#instance;
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

	public async create(request: CreateRequest): Promise<void> {
		const { error } = await supabase.from(this._RESOURCE_NAME).insert(request);

		if (error !== null) {
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
		const { error } = await supabase.storage
			.from(this._STORAGE_NAME)
			.remove([`${name}`]);

		if (error !== null) {
			throw error;
		}
	}

	public async uploadPhoto(file: File): Promise<{ path: string } | null> {
		const { data, error } = await supabase.storage
			.from(this._STORAGE_NAME)
			.upload(`${file.name}`, file, { cacheControl: '3600', upsert: false });

		if (error !== null) {
			throw error;
		}
		return data;
	}
}
