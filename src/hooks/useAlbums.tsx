import { useEffect, useState } from 'react';

import supabase from '../services/supabase-service';
import { getMainAlbums } from '../services/album-services';

import { type AlbumDB } from '../models/album.interface';

interface TypeReturnHook {
	albums: AlbumDB[] | null;
}

export default function useAlbums(): TypeReturnHook {
	const [albums, setAlbums] = useState<AlbumDB[] | null>(null);

	useEffect(() => {
		setAlbums(null);
		getMainAlbums()
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
			void channel.unsubscribe();
		};
	}, []);

	return { albums };
}
