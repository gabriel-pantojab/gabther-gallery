import SupabaseError from './supabase-error';

import supabase from './supabase-service';

import {
	type ReactionData,
	type ReactionType,
} from '../models/reaction.interface';

export async function getReactionsLoveNote(
	idLoveNote: number,
): Promise<ReactionData[]> {
	const { data, error } = await supabase
		.from('reaction')
		.select('id, created_at, id_love_note, reaction, user( id, name)')
		.eq('id_love_note', idLoveNote)
		.returns<ReactionData[]>();

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data.map(reaction => {
		return {
			...reaction,
			user: { id: reaction.user.id, name: reaction.user.name },
		};
	});
}

export async function insertReaction({
	idLoveNote,
	idUser,
	reaction,
}: {
	idLoveNote: number;
	idUser: string;
	reaction: ReactionType;
}): Promise<void> {
	const reactionData: {
		id_love_note: number;
		id_user: string;
		reaction: string;
	} = { id_love_note: idLoveNote, id_user: idUser, reaction };

	const { error } = await supabase.from('reaction').insert(reactionData);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}

export async function updateReaction({
	idLoveNote,
	idUser,
	reaction,
}: {
	idLoveNote: number;
	idUser: string;
	reaction: ReactionType;
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
		throw new SupabaseError(error);
	}
}

export async function deleteReaction({
	idLoveNote,
	idUser,
}: {
	idLoveNote: number;
	idUser: string;
}): Promise<void> {
	const { error } = await supabase
		.from('reaction')
		.delete()
		.eq('id_love_note', idLoveNote)
		.eq('id_user', idUser);

	if (error !== null) {
		throw new SupabaseError(error);
	}
}
