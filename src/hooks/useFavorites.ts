import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import supabase from '../services/supabase-service';
import { getFavoritePhotos, updateFavorite } from '../services/photo-service';

import { type PhotoDB } from '../models/photo.interface';

interface TypeReturnHook {
	favorites: PhotoDB[] | null;
	removeFavorite: (id: number) => void;
}

export default function useFavorites(): TypeReturnHook {
	const [favorites, setFavorites] = useState<PhotoDB[] | null>([]);

	useEffect(() => {
		setFavorites(null);
		getFavoritePhotos()
			.then(data => {
				setFavorites(data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		const updateChannel = supabase
			.channel('update-favorites')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'photo' },
				(payload: any) => {
					setFavorites(prev => {
						if (prev !== null) {
							const oldId = payload.new.id;
							return prev.filter(favorite => favorite.id !== oldId);
						}
						return null;
					});
				},
			)
			.subscribe();

		return () => {
			void updateChannel.unsubscribe();
		};
	}, []);

	const removeFavorite = (id: number): void => {
		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes!',
			cancelButtonText: 'No',
		})
			.then(async result => {
				if (result.isConfirmed) {
					await updateFavorite({
						photoId: id,
						favorite: false,
					});
				}
			})
			.catch((error: any) => {
				toast.error('Error, ' + error.message, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	};

	return { favorites, removeFavorite };
}
