import SupabaseError from './supabase-error';

import supabase from './supabase-service';

import { type AlbumDB } from '../models/album.interface';
import { type PhotoDB } from '../models/photo.interface';

// TODO: Cambiar nombre de método, no va con la funcionalidad
export async function getMainAlbums(): Promise<AlbumDB[]> {
	const { data, error } = await supabase
		.from('album')
		.select('*')
		.is('parent_id', null)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function getAlbumsAll(): Promise<AlbumDB[]> {
	const { data, error } = await supabase
		.from('album')
		.select('*')
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function insertAlbum({
	name,
	urlAlbumCover = '',
	parentId = null,
}: {
	name: string;
	urlAlbumCover?: string;
	parentId?: number | null;
}): Promise<void> {
	const album: {
		name: string;
		url_album_cover: string;
		parent_id?: number | null;
	} = { name, url_album_cover: urlAlbumCover, parent_id: parentId };

	const { error } = await supabase.from('album').insert(album);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}

export async function getPhotosByAlbum(id: number): Promise<PhotoDB[]> {
	const { data, error } = await supabase
		.from('photo_album')
		.select('id_photo, photo (id, created_at, name, url_image, favorite)')
		.eq('id_album', id);

	if (error !== null) {
		throw new SupabaseError(error);
	}

	const photos: PhotoDB[] = data.map((item: any) => item.photo);
	photos.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	return photos;
}

export async function getSubAlbumsById(parentId: number): Promise<AlbumDB[]> {
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

export async function uploadAlbumCover(file: File, name: string): Promise<any> {
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

export async function insertPhotoToAlbum({
	idPhoto,
	idAlbum,
}: {
	idPhoto: number;
	idAlbum: number | null;
}): Promise<void> {
	const { error } = await supabase
		.from('photo_album')
		.insert({ id_photo: idPhoto, id_album: idAlbum });
	if (error !== null) {
		throw new SupabaseError(error);
	}
}

export async function deletePhotoFromAlbum({
	idPhoto,
	idAlbum,
}: {
	idPhoto: number;
	idAlbum: number;
}): Promise<void> {
	const { error } = await supabase
		.from('photo_album')
		.delete()
		.eq('id_photo', idPhoto)
		.eq('id_album', idAlbum);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}
