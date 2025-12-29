import { Album } from '@/core/types/domain/album.model';
import { useCallback, useEffect, useState } from 'react';
import { AlbumMapper } from '@/core/mappers/album.mapper';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { useCreateAlbumEvent } from './use-create-album-event';
import { AlbumService } from '../services/album.service';

type Return = {
	albums: Album[] | null;
};

export function useAlbums(): Return {
	const [albums, setAlbums] = useState<Album[] | null>(null);
	useCreateAlbumEvent((album: Album) => {
		setAlbums(prev => [album, ...(prev ?? [])]);
	});

	const getAlbums = useCallback(async () => {
		const albumsResponse: AlbumResponse[] =
			await AlbumService.getInstance().findRoots();
		setAlbums(AlbumMapper.many(albumsResponse));
	}, []);

	useEffect(() => {
		getAlbums();
	}, []);

	return { albums };
}
