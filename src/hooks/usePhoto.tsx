import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { SupabaseContext } from '../context/supabaseContext';
import { type PhotoDB } from '../models/photo.interface';

interface TypeReturnHook {
	photo: PhotoDB | null;
	toggleFavorite: () => void;
	favorite: boolean;
}

export default function usePhoto({
	photoId,
}: {
	photoId: number;
}): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);

	const [photo, setPhoto] = useState<PhotoDB | null>(null);
	const [favorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		getPhoto(photoId)
			.then(data => {
				setPhoto(data);
				setFavorite(data?.favorite ?? false);
			})
			.catch(error => {
				console.log(error);
				setPhoto(null);
			});
	}, []);

	const getPhoto = async (id: number): Promise<PhotoDB | null> => {
		const { data, error } = await supabase
			.from('photo')
			.select('*')
			.eq('id', id)
			.single();

		if (error !== null) {
			throw error;
		}

		return data;
	};

	const updateFavorite = async ({
		favorite,
	}: {
		favorite: boolean;
	}): Promise<PhotoDB | null> => {
		const { data, error } = await supabase
			.from('photo')
			.update({ favorite })
			.eq('id', photoId)
			.select()
			.single();

		if (error !== null) {
			throw error;
		}

		return data;
	};

	const toggleFavorite = (): void => {
		const oldFavorite = favorite;
		setFavorite(!oldFavorite);
		updateFavorite({ favorite: !favorite }).catch((error: any) => {
			setFavorite(oldFavorite);
			toast.error('Error, ' + error.message);
		});
	};

	return { photo, toggleFavorite, favorite };
}
