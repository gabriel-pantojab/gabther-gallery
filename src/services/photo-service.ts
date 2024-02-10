import { type PhotoDB } from '../models/photo.interface';
import SupabaseError from './supabase-error';
import supabase from './supabase-service';

export async function getPhotos(): Promise<PhotoDB[]> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function getPhoto(id: number): Promise<PhotoDB | null> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.eq('id', id)
		.single();

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function updateFavorite({
	photoId,
	favorite,
}: {
	photoId: number;
	favorite: boolean;
}): Promise<PhotoDB | null> {
	const { data, error } = await supabase
		.from('photo')
		.update({ favorite })
		.eq('id', photoId)
		.select()
		.single();

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function deletePhoto(id: number): Promise<void> {
	const { error } = await supabase.from('photo').delete().eq('id', id);

	if (error !== null) {
		throw new SupabaseError(error);
	}
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
