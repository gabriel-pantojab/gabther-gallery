import { type PhotoDB } from '../models/photo.interface';

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
