import { useEffect, useState } from 'react';
import type { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';
import type { PhotoResponse } from '../api/response/photo.response';
import { PhotoAdapter } from '../adapters/photo.adapter';

interface Return {
	photos: Photo[];
}

export default function usePhotos(): Return {
	const [photos, setPhotos] = useState<Photo[] | null>(null);

	useEffect(() => {
		setPhotos(null);
		PhotoService.getInstance()
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
