import { useContext, useEffect, useState } from 'react';

import { type PhotoDB } from '../models/photo.interface';
import { getPhotosByAlbum } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
}

export default function usePhotosAlbum({
	idAlbum,
}: {
	idAlbum: number;
}): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const [photos, setPhotos] = useState<PhotoDB[] | null>([]);

	useEffect(() => {
		getPhotosByAlbum(idAlbum, supabase)
			.then(photos => {
				setPhotos(photos);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const channel = supabase
			.channel('album-insert')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'photo' },
				(payload: any) => {
					if (payload.new.id_album !== idAlbum) return;
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
			channel.unsubscribe();
		};
	}, []);

	useEffect(() => {
		const channel = supabase
			.channel('album-update')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'photo' },
				(payload: any) => {
					setPhotos(prev => {
						if (prev !== null) {
							if (payload.new.id_album === idAlbum)
								return [payload.new, ...prev];
							return prev.filter(photo => photo.id !== payload.new.id);
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

	return { photos };
}
