import { useEffect, useState } from 'react';

import supabase from '../services/supabase-service';
import { getPhotos } from '../services/photo-service';

import { type PhotoDB } from '../models/photo.interface';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
}

export default function usePhotos(): TypeReturnHook {
	const [photos, setPhotos] = useState<PhotoDB[] | null>(null);

	useEffect(() => {
		setPhotos(null);
		getPhotos()
			.then(data => {
				setPhotos(data);
			})
			.catch(_ => {
				setPhotos([]);
			});
	}, []);

	useEffect(() => {
		const channel = supabase
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
			void channel.unsubscribe();
		};
	}, []);

	return { photos };
}
