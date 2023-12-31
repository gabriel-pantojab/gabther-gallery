import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { getAlbums } from '../utils/supabase';
import { type AlbumDB } from '../models/album.interface';

interface TypeReturnHook {
	albums: AlbumDB[] | null;
}

export default function useAlbums(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const [albums, setAlbums] = useState<AlbumDB[] | null>(null);

	useEffect(() => {
		getAlbums(supabase)
			.then(data => {
				setAlbums(data);
			})

			.catch(_ => {
				setAlbums([]);
			});
	}, []);

	useEffect(() => {
		const channel = supabase
			.channel('album-insert')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'album' },
				(payload: any) => {
					setAlbums(prev => {
						if (prev !== null) {
							return [payload.new, ...prev];
						}
						return null;
					});
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);

	return { albums };
}
