import { type AlbumDB } from '../models/album.interface';
import { type LoveNote } from '../models/loveNote.interface';
import { type PhotoDB } from '../models/photo.interface';
import { type Template } from '../models/template.interface';

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

export async function getAlbums(supabase: any): Promise<AlbumDB[]> {
	const { data, error } = await supabase
		.from('album')
		.select('*')
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function updatePhotoToAlbum({
	idPhoto,
	idAlbum,
	supabase,
}: {
	idPhoto: number;
	idAlbum: number | null;
	supabase: any;
}): Promise<void> {
	console.log(idPhoto, idAlbum);
	const { error } = await supabase
		.from('photo')
		.update({ id_album: idAlbum })
		.eq('id', idPhoto);
	if (error !== null) {
		throw error;
	}
}

export async function insertAlbum({
	name,
	urlAlbumCover = '',
	supabase,
}: {
	name: string;
	urlAlbumCover?: string;
	supabase: any;
}): Promise<void> {
	const album: {
		name: string;
		url_album_cover: string;
	} = { name, url_album_cover: urlAlbumCover };

	const { error } = await supabase.from('album').insert(album);

	if (error !== null) {
		throw error;
	}
}

export async function getPhotosByAlbum(
	id: number,
	supabase: any,
): Promise<PhotoDB[]> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.eq('id_album', id)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function getSendLoveNotes(
	idAuthor: string,
	supabase: any,
): Promise<LoveNote[]> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('author', idAuthor)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function getReceivedLoveNotes(
	idReceived: string,
	supabase: any,
): Promise<LoveNote[]> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('recipient', idReceived)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function sendLoveNote(
	loveNote: {
		author: string;
		recipient: string;
		title: string;
		message: string;
		template: string;
		email_recipient: string;
		email_author: string;
	},
	supabase: any,
): Promise<void> {
	const { error } = await supabase.from('love_note').insert(loveNote);

	if (error !== null) {
		throw error;
	}
}

export async function getLoveNote(
	idLoveNote: number,
	supabase: any,
): Promise<LoveNote> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('id', idLoveNote)
		.single();

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function getTemplates(supabase: any): Promise<Template[]> {
	const { data, error } = await supabase
		.from('template')
		.select('*')
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
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

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function uploadAlbumCover(
	file: File,
	name: string,
	supabase: any,
): Promise<any> {
	const { data: data1, error } = await supabase.storage
		.from('albums')
		.upload(`${name}/${file.name}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	const { data: data2 } = supabase.storage
		.from('albums')
		.getPublicUrl(data1.path);

	if (error !== null) {
		throw error;
	}
	return { url: data2.publicUrl };
}
