import { type PhotoDB } from '../models/photo.interface';

// DATABASE

export async function getPhotos(supabase: any): Promise<PhotoDB[]> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function insertFile({
	name,
	urlImage,
	idAlbum,
	supabase,
}: {
	name: string;
	urlImage: string;
	idAlbum?: number;
	supabase: any;
}): Promise<void> {
	const file: {
		name: string;
		url_image: string;
		id_album?: number;
	} = { name, url_image: urlImage };

	if (idAlbum !== undefined) {
		file.id_album = idAlbum;
	}

	const { error } = await supabase.from('photo').insert(file);

	if (error !== null) {
		throw error;
	}
}

export async function getPhoto(
	id: number,
	supabase: any,
): Promise<PhotoDB | null> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.eq('id', id)
		.single();

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function updateFavorite({
	photoId,
	favorite,
	supabase,
}: {
	photoId: number;
	favorite: boolean;
	supabase: any;
}): Promise<PhotoDB | null> {
	const { data, error } = await supabase
		.from('photo')
		.update({ favorite })
		.eq('id', photoId)
		.select()
		.single();

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function deletePhoto(id: number, supabase: any): Promise<void> {
	const { error } = await supabase.from('photo').delete().eq('id', id);

	if (error !== null) {
		throw error;
	}
}

// STORAGE

export async function uploadFile(file: File, supabase: any): Promise<any> {
	const { data, error } = await supabase.storage
		.from('photos')
		.upload(`${file.name}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (error !== null) {
		throw error;
	}
	return data;
}

export async function deletePhotoStorage(
	name: string,
	supabase: any,
): Promise<void> {
	const { data, error } = await supabase.storage
		.from('photos')
		.remove([`${name}`]);

	console.log(error);

	if (error !== null) {
		throw error;
	}

	return data;
}
