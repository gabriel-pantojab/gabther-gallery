import { useEffect, useState } from 'react';
import type { Photo } from '@/core/types/domain/photo.model';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import type { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { MediaService } from '../services/media.service';
import { useAddMediaEvent } from './events/use-add-media-event';
import { useDeleteMediaEvent } from './events/use-delete-media-event';

interface Return {
	photos: Photo[];
}

export default function useMedia(): Return {
	const [photos, setPhotos] = useState<Photo[] | null>(null);
	useAddMediaEvent((media: Photo) => {
		setPhotos(prev => [media, ...(prev ?? [])]);
	});
	useDeleteMediaEvent((media: Pick<PhotoResponse, 'id'>) => {
		setPhotos(prev => (prev ?? [])?.filter(m => m.id !== media.id));
	});

	useEffect(() => {
		setPhotos(null);
		MediaService.getInstance()
			.findAll()
			.then((data: PhotoResponse[]) => {
				setPhotos(PhotoMapper.many(data));
			})
			.catch(_ => {
				setPhotos([]);
			});
	}, []);

	return { photos: photos ?? [] };
}
