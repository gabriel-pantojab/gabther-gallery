import { useEffect, useState } from 'react';
import { Id as ToastId } from 'react-toastify';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { ToastService } from '@/core/service/toast.service';
import { MediaService } from '../services/media.service';

export function useMediaViewer(mediaId: number) {
	const [media, setMedia] = useState<Photo | null>(null);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const getMedia = async () => {
		try {
			const mediaResponse: PhotoResponse | null =
				await MediaService.getInstance().find(mediaId);
			if (mediaResponse) {
				setMedia(PhotoMapper.single(mediaResponse));
				setIsFavorite(mediaResponse.favorite ?? false);
			}
		} catch (_) {}
	};

	const toggleFavorite = async () => {
		const oldFavorite: boolean = isFavorite;
		setIsFavorite(!oldFavorite);
		try {
			await MediaService.getInstance().updateFavorite({
				photo_id: mediaId,
				is_favorite: !oldFavorite,
			});
		} catch (error: any) {
			setIsFavorite(oldFavorite);
			// TODO: manejar en un service
			ToastService.getInstance().error(error.message);
		}
	};

	const deleteMedia = async () => {
		const toastId: ToastId = ToastService.getInstance().loading('Deleting...');
		try {
			await MediaService.getInstance().deleteFromStorage(media?.name ?? '');
			await MediaService.getInstance().delete(mediaId);
			// TODO: manejar en un service
			ToastService.getInstance().success(
				'Media deleted successfully!',
				toastId,
			);
		} catch (error: any) {
			// TODO: manejar en un service
			ToastService.getInstance().error(error.message, toastId);
		}
	};

	useEffect(() => {
		getMedia();
	}, []);

	return { media, isFavorite, toggleFavorite, deleteMedia };
}
