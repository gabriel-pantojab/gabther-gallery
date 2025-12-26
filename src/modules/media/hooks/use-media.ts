import { useEffect, useState } from 'react';
import type { Photo } from '@/core/types/domain/photo.model';
import { PhotoAdapter } from '@/core/mappers/photo.mapper';
import type { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { MediaService } from '../services/media.service';

interface Return {
	photos: Photo[];
}

export default function useMedia(): Return {
	const [photos, setPhotos] = useState<Photo[] | null>(null);

	useEffect(() => {
		setPhotos(null);
		MediaService.getInstance()
			.findAll()
			.then((data: PhotoResponse[]) => {
				setPhotos(PhotoAdapter.many(data));
			})
			.catch(_ => {
				setPhotos([]);
			});
	}, []);

	return { photos: photos ?? [] };
}
