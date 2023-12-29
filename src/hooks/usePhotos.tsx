import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { type PhotoDB } from '../models/photo.interface';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
}

export default function usePhotos(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const [photos, setPhotos] = useState<PhotoDB[] | null>(null);

	useEffect(() => {
		getFiles()
			.then(data => {
				setPhotos(data);
			})
			.catch(error => {
				console.log(error);
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
							return [...prev, payload.new];
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

	const getFiles = async (): Promise<PhotoDB[]> => {
		const { data, error } = await supabase
			.from('photo')
			.select('*')
			.order('created_at', { ascending: false });

		if (error !== null) {
			throw error;
		}

		return data;
	};

	return { photos };
}
