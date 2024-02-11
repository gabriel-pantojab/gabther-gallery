import SupabaseError from './supabase-error';

import supabase from './supabase-service';

import { type LoveNote } from '../models/loveNote.interface';
import { type Template } from '../models/template.interface';

export async function getSendLoveNotes(idAuthor: string): Promise<LoveNote[]> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('author', idAuthor)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function getReceivedLoveNotes(
	idReceived: string,
): Promise<LoveNote[]> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('recipient', idReceived)
		.order('created_at', { ascending: false });

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function sendLoveNote(loveNote: {
	author: string;
	recipient: string;
	title: string;
	message: string;
	template: string;
	email_recipient: string;
	email_author: string;
	url_love_note: string;
}): Promise<void> {
	const { error } = await supabase.from('love_note').insert(loveNote);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}

export async function getLoveNote(idLoveNote: number): Promise<LoveNote> {
	const { data, error } = await supabase
		.from('love_note')
		.select('*')
		.eq('id', idLoveNote)
		.single();

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function getTemplates(): Promise<Template[]> {
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
		throw new SupabaseError(error);
	}

	return data;
}

export async function getCountUnreadLoveNotes(idUser: string): Promise<number> {
	const { data, error } = await supabase
		.from('love_note')
		.select('id')
		.eq('recipient', idUser)
		.eq('state', 'SENT');

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data.length;
}

export async function readLoveNote(idLoveNote: number): Promise<void> {
	const { error } = await supabase
		.from('love_note')
		.update({ state: 'READ' })
		.eq('id', idLoveNote);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}

export async function uploadLoveNote(file: File): Promise<any> {
	const { data, error } = await supabase.storage
		.from('love_notes')
		.upload(`${file.name}`, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (error !== null) {
		throw error;
	}

	const { data: data2 } = supabase.storage
		.from('love_notes')
		.getPublicUrl(data.path);

	return { url: data2.publicUrl };
}
