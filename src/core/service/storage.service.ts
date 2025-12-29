import supabase from '../supabase/supabase-client';

export class StorageService {
	static #instance: StorageService;

	public static getInstance(): StorageService {
		if (!StorageService.#instance) {
			StorageService.#instance = new StorageService();
		}
		return StorageService.#instance;
	}

	public async upload(
		bucket: string,
		file: File,
	): Promise<{ path: string } | null> {
		const { data, error } = await supabase.storage
			.from(bucket)
			.upload(`${file.name}`, file, { cacheControl: '3600', upsert: false });

		if (error !== null) {
			throw error;
		}
		return data;
	}

	public async bulkUpload(
		bucket: string,
		files: File[],
	): Promise<Array<{ path: string } | null>> {
		const promises = files.map(file => this.upload(bucket, file));
		return Promise.all(promises);
	}

	public async delete(bucket: string, name: string): Promise<void | never> {
		const { error } = await supabase.storage.from(bucket).remove([`${name}`]);

		if (error !== null) {
			throw error;
		}
	}

	public getPublicUrl(path: string): string {
		const { data } = supabase.storage
			.from('photos')
			.getPublicUrl(path as string);
		return data.publicUrl;
	}
}
