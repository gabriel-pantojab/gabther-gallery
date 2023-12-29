import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { type PhotoDB } from '../models/photo.interface';
import { getPhotos } from '../utils/supabase';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
}

export default function usePhotos(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const [photos, setPhotos] = useState<PhotoDB[] | null>(null);

	useEffect(() => {
		getPhotos(supabase)
			.then(data => {
				setPhotos(data);
			})
			.catch(_ => {
				setPhotos([]);
			});
	}, []);

	useEffect(() => {
		supabase
			.channel('room1')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'photo' },
				(payload: any) => {
					setPhotos(prev => {
						if (prev !== null) {
							return [payload.new, ...prev];
						}
						return null;
					});
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel('room1');
		};
	}, []);

	return { photos };
}
