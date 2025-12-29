import { useEffect } from 'react';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { AlbumService } from '../services/album.service';
import { AlbumEventsService } from '../services/album-events.service';

export function useAddMediaToAlbumEvent(
	handle: (media: Photo | null) => void,
): void {
	useEffect(() => {
		const channel = AlbumEventsService.getInstance()
			.on(
				'INSERT',
				'photo_album',
				'ADD_MEDIA_TO_ALBUM',
				async (payload: any) => {
					const { id_photo } = payload.new;
					const media: PhotoResponse =
						await AlbumService.getInstance().findMediaById(id_photo);
					handle(PhotoMapper.single(media));
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, []);
}
