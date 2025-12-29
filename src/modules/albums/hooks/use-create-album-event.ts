import { useEffect } from 'react';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { AlbumEventsService } from '@/core/service/album-events.service';
import { Album } from '@/core/types/domain/album.model';
import { AlbumMapper } from '@/core/mappers/album.mapper';

export function useCreateAlbumEvent(handle: (album: Album) => void): void {
	useEffect(() => {
		const channel = AlbumEventsService.getInstance()
			.onInsert('INSERT_ALBUM', (payload: AlbumResponse) => {
				handle(AlbumMapper.single(payload));
			})
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, []);
}
