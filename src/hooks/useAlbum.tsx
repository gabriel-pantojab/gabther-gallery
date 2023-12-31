import { useContext, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import {
	insertAlbum,
	uploadAlbumCover as upAlbumCover,
} from '../utils/supabase';

interface TypeReturnHook {
	createAlbum: (name: string, albumCover?: File | null) => Promise<void>;
	creating: boolean;
}

export default function useAlbum(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const [creating, setCreating] = useState<boolean>(false);

	const createAlbum = async (
		name: string,
		albumCover?: File | null,
	): Promise<void> => {
		try {
			setCreating(true);
			if (name === '') throw new Error('Name is required');
			let urlAlbumCover;
			if (albumCover !== undefined && albumCover !== null)
				urlAlbumCover = await uploadAlbumCover(albumCover, name);
			await insertAlbum({ name, urlAlbumCover, supabase });
		} finally {
			setCreating(false);
		}
	};

	const uploadAlbumCover = async (
		file: File,
		name: string,
	): Promise<string> => {
		const { url } = await upAlbumCover(file, name, supabase);
		return url;
	};

	return { createAlbum, creating };
}
