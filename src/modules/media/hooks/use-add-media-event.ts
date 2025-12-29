import { useEffect } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { MediaEventsService } from '@/core/service/media-events.service';
import { PhotoMapper } from '@/core/mappers/photo.mapper';

export function useAddMediaEvent(handle: (media: Photo) => void) {
	useEffect(() => {
		const channel = MediaEventsService.getInstance()
			.onInsert('INSERT_MEDIA', (media: PhotoResponse) => {
				handle(PhotoMapper.single(media));
			})
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);
}
