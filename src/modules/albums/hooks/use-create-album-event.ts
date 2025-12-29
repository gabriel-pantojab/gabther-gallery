import { useEffect } from 'react';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { AlbumEventsService } from '../services/album-events.service';

export function useCreateAlbumEvent(
	handle: (album: AlbumResponse) => void,
): void {
	useEffect(() => {
		const channel = AlbumEventsService.getInstance()
			.on('INSERT', 'album', 'INSERT_ALBUM', (payload: any) => {
				handle(payload.new);
			})
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, []);
}
