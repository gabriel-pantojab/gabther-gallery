import { useEffect } from 'react';
import { MediaEventsService } from '@/core/service/media-events.service';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';

export function useUpdateMediaEvent(
	handle: (media: PhotoResponse) => void,
): void {
	useEffect(() => {
		const channel = MediaEventsService.getInstance()
			.onUpdate('UPDATE_MEDIA', (payload: PhotoResponse) => {
				handle(payload);
			})
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);
}
