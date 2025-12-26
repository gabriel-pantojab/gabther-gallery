import { useEffect, useState } from 'react';

import supabase from '../services/supabase-service';
// import { getPhotos } from '../services/photo-service';

import { type PhotoDB } from '../models/photo.interface';
import { MediaService } from '@/modules/media/services/media.service';
import type { Photo } from '@/core/types/domain/photo.model';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import type { PhotoResponse } from '@/core/types/dto/response/photo.response';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
}

export default function usePhotos(): TypeReturnHook {
	const [photos, setPhotos] = useState<Photo[] | null>(null);

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

	useEffect(() => {
		const channel = supabase
			.channel('room1')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'photo' },
				(payload: any) => {
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
			void channel.unsubscribe();
		};
	}, []);

	return {
		photos:
			photos?.map(photo => ({
				id: photo.id,
				created_at: photo.createdAt,
				name: photo.name,
				url_image: photo.urlImage,
				id_album: photo.idAlbum,
				favorite: photo.favorite,
			})) ?? null,
	};
}
