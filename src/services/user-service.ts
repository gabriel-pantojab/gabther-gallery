import { type User } from '../models/user.interface';
import SupabaseError from './supabase-error';

import supabase from './supabase-service';

export async function getUsers(): Promise<User[]> {
	const { data, error } = await supabase.from('user').select('*');

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data;
}

export async function getUserName(idUser: string): Promise<string> {
	const { data, error } = await supabase
		.from('user')
		.select('name')
		.eq('id', idUser)
		.single();

	if (error !== null) {
		throw new SupabaseError(error);
	}

	return data.name;
}
