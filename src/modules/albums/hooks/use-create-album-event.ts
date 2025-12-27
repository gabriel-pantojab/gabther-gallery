import { useEffect } from 'react';
import supabase from '@/core/supabase/supabase-client';
import { AlbumResponse } from '@/core/types/dto/response/album.response';

export function useCreateAlbumEvent(
	handle: (album: AlbumResponse) => void,
): void {
	useEffect(() => {
		const channel = supabase
			.channel('album-insert')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'album' },
				(payload: any) => {
					handle(payload.new);
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, []);
}
