import { MediaEventsService } from '@/core/service/media-events.service';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { useEffect } from 'react';

export function useDeleteMediaEvent(
	handle: (media: Pick<PhotoResponse, 'id'>) => void,
) {
	useEffect(() => {
		const channel = MediaEventsService.getInstance()
			.onDelete('DELETE_MEDIA', (media: Pick<PhotoResponse, 'id'>) => {
				handle(media);
			})
			.subscribe();
		return () => {
			channel.unsubscribe();
		};
	}, [handle]);
}
