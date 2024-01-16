import { type AlbumDB } from '../models/album.interface';
import { type LoveNote } from '../models/loveNote.interface';
import { type PhotoDB } from '../models/photo.interface';
import {
	type ReactionType,
	type ReactionData,
} from '../models/reaction.interface';
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
		.is('parent_id', null)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function insertPhotoToAlbum({
	idPhoto,
	idAlbum,
	supabase,
}: {
	idPhoto: number;
	idAlbum: number | null;
	supabase: any;
}): Promise<void> {
	const { error } = await supabase
		.from('photo_album')
		.insert({ id_photo: idPhoto, id_album: idAlbum });
	if (error !== null) {
		throw error;
	}
}

export async function insertAlbum({
	name,
	urlAlbumCover = '',
	parentId = null,
	supabase,
}: {
	name: string;
	urlAlbumCover?: string;
	parentId?: number | null;
	supabase: any;
}): Promise<void> {
	const album: {
		name: string;
		url_album_cover: string;
		parent_id?: number | null;
	} = { name, url_album_cover: urlAlbumCover, parent_id: parentId };

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
		.from('photo_album')
		.select('id_photo, photo (id, created_at, name, url_image, favorite)')
		.eq('id_album', id);

	const photos: PhotoDB[] = data.map((item: any) => item.photo);
	photos.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	if (error !== null) {
		throw error;
	}

	return photos;
}

export async function getSubAlbumsById(
	parentId: number,
	supabase: any,
): Promise<AlbumDB[]> {
	const { data, error } = await supabase
		.from('album')
		.select('*')
		.eq('parent_id', parentId)
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
		url_love_note: string;
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
		.select(
			`
		id, 
		name,
		created_at,
		url_template ( id, url )
	`,
		)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function getCountUnreadLoveNotes(
	idUser: string,
	supabase: any,
): Promise<number> {
	const { data, error } = await supabase
		.from('love_note')
		.select('id')
		.eq('recipient', idUser)
		.eq('state', 'SENT');

	if (error !== null) {
		throw error;
	}

	return data.length;
}

export async function readLoveNote(
	idLoveNote: number,
	supabase: any,
): Promise<void> {
	const { error } = await supabase
		.from('love_note')
		.update({ state: 'READ' })
		.eq('id', idLoveNote);

	if (error !== null) {
		throw error;
	}
}

export async function getFavoritePhotos(supabase: any): Promise<PhotoDB[]> {
	const { data, error } = await supabase
		.from('photo')
		.select('*')
		.eq('favorite', true)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function getReactionsLoveNote(
	idLoveNote: number,
	supabase: any,
): Promise<ReactionData[]> {
	const { data, error } = await supabase
		.from('reaction')
		.select('id, created_at, id_love_note, reaction, user( id, name)')
		.eq('id_love_note', idLoveNote);

	if (error !== null) {
		throw error;
	}

	return data;
}

export async function insertReaction({
	idLoveNote,
	idUser,
	reaction,
	supabase,
}: {
	idLoveNote: number;
	idUser: string;
	reaction: ReactionType;
	supabase: any;
}): Promise<void> {
	const reactionData: {
		id_love_note: number;
		id_user: string;
		reaction: string;
	} = { id_love_note: idLoveNote, id_user: idUser, reaction };

	const { error } = await supabase.from('reaction').insert(reactionData);

	if (error !== null) {
		throw error;
	}
}

export async function updateReaction({
	idLoveNote,
	idUser,
	reaction,
	supabase,
}: {
	idLoveNote: number;
	idUser: string;
	reaction: ReactionType;
	supabase: any;
}): Promise<void> {
	const updateDate = new Date();
	const day = updateDate.getDate();
	const month = updateDate.getMonth() + 1;
	const year = updateDate.getFullYear();
	const hr = updateDate.getHours();
	const min = updateDate.getMinutes();
	const sec = updateDate.getSeconds();
	const ms = updateDate.getMilliseconds();
	const updateDateStr = `${year}-${month}-${day} ${hr}:${min}:${sec}.${ms}`;
	const { error } = await supabase
		.from('reaction')
		.update({ reaction, created_at: updateDateStr })
		.eq('id_love_note', idLoveNote)
		.eq('id_user', idUser);

	if (error !== null) {
		throw error;
	}
}

export async function deleteReaction({
	idLoveNote,
	idUser,
	supabase,
}: {
	idLoveNote: number;
	idUser: string;
	supabase: any;
}): Promise<void> {
	const { error } = await supabase
		.from('reaction')
		.delete()
		.eq('id_love_note', idLoveNote)
		.eq('id_user', idUser);

	if (error !== null) {
		throw error;
	}
}

export async function getUserName(
	idUser: string,
	supabase: any,
): Promise<string> {
	const { data, error } = await supabase
		.from('user')
		.select('name')
		.eq('id', idUser)
		.single();

	if (error !== null) {
		throw error;
	}

	return data.name;
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

export async function uploadLoveNote(file: File, supabase: any): Promise<any> {
	const { data, error } = await supabase.storage
		.from('love_notes')
		.upload(`${file.name}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	const { data: data2 } = supabase.storage
		.from('love_notes')
		.getPublicUrl(data.path);

	if (error !== null) {
		throw error;
	}

	return { url: data2.publicUrl };
}
