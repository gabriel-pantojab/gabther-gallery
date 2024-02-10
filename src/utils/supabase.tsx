import { type LoveNote } from '../models/loveNote.interface';
import {
	type ReactionType,
	type ReactionData,
} from '../models/reaction.interface';
import { type Template } from '../models/template.interface';

// DATABASE

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
