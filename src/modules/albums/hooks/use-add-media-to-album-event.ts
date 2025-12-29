import { useEffect } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { MediaAlbumEventsService } from '@/core/service/media-album-events.service';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { PhotoAlbumResponse } from '@/core/types/dto/response/photo-album.response';
import { AlbumService } from '../services/album.service';

export function useAddMediaToAlbumEvent(
	handle: (media: Photo | null) => void,
): void {
	useEffect(() => {
		const channel = MediaAlbumEventsService.getInstance()
			.onInsert('ADD_MEDIA_TO_ALBUM', async (payload: PhotoAlbumResponse) => {
				const { id_photo } = payload;
				const media: PhotoResponse =
					await AlbumService.getInstance().findMediaById(id_photo);
				handle(PhotoMapper.single(media));
			})
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);
}
