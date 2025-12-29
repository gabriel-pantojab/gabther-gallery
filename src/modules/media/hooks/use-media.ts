import { useEffect, useState } from 'react';
import type { Photo } from '@/core/types/domain/photo.model';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import type { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { MediaService } from '../services/media.service';
import { useAddMediaEvent } from './use-add-media-event';

interface Return {
	photos: Photo[];
}

export default function useMedia(): Return {
	const [photos, setPhotos] = useState<Photo[] | null>(null);
	useAddMediaEvent((media: Photo) => {
		setPhotos(prev => [media, ...(prev ?? [])]);
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
