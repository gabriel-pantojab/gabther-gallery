import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { SupabaseContext } from '../context/supabaseContext';
import { type PhotoDB } from '../models/photo.interface';
import {
	getPhoto,
	updateFavorite,
	deletePhoto as deletePhotoDB,
	deletePhotoStorage,
} from '../utils/supabase';

interface TypeReturnHook {
	photo: PhotoDB | null;
	favorite: boolean;
	deleting: boolean;
	toggleFavorite: () => void;
	deletePhoto: () => Promise<void>;
}

export default function usePhoto({
	photoId,
}: {
	photoId: number;
}): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);

	const [photo, setPhoto] = useState<PhotoDB | null>(null);
	const [favorite, setFavorite] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);

	useEffect(() => {
		getPhoto(photoId, supabase)
			.then(data => {
				setPhoto(data);
				setFavorite(data?.favorite ?? false);
			})
			.catch(_ => {
				setPhoto(null);
			});
	}, []);

	const toggleFavorite = (): void => {
		const oldFavorite = favorite;
		setFavorite(!oldFavorite);
		updateFavorite({ photoId, favorite: !favorite, supabase }).catch(
			(error: any) => {
				setFavorite(oldFavorite);
				toast.error('Error, ' + error.message);
			},
		);
	};

	const deletePhoto = async (): Promise<void> => {
		const id = toast.loading('Deleting...');
		try {
			setDeleting(true);
			await deletePhotoStorage(photo?.name ?? '', supabase);
			await deletePhotoDB(photoId, supabase);
			toast.update(id, {
				render: 'Photo deleted successfully!',
				type: 'success',
				isLoading: false,
				autoClose: 5000,
				closeOnClick: true,
			});
		} catch (error: any) {
			toast.update(id, {
				render: 'Error, ' + error.message,
				type: 'error',
				isLoading: false,
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} finally {
			setDeleting(false);
		}
	};

	return { photo, favorite, deleting, toggleFavorite, deletePhoto };
}
