import { useCallback, useEffect, useState } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { ToastService } from '@/core/service/toast.service';
import { MediaService } from '../services/media.service';
import { useUpdateMediaEvent } from './events/use-update-media-event';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';

type Return = { favorites: Photo[] | null };

export function useFavoriteMedia(): Return {
	const [favorites, setFavorites] = useState<Photo[] | null>(null);
	useUpdateMediaEvent((media: PhotoResponse) => {
		removeFavorite(media.id);
	});

	useEffect(() => {
		getFavorites();
	}, []);

	const removeFavorite = useCallback(
		(id: number) => {
			setFavorites(prev => (prev ?? [])?.filter(media => media.id !== id));
		},
		[setFavorites],
	);

	const getFavorites = useCallback(async () => {
		try {
			const response = await MediaService.getInstance().findFavorites();
			setFavorites(PhotoMapper.many(response));
		} catch (error: any) {
			ToastService.getInstance().error(error.message);
			setFavorites([]);
		}
	}, []);

	return { favorites };
}
