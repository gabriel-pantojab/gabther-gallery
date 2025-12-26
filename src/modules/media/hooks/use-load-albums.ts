import { Album } from '@/core/types/domain/album.model';
import { useEffect, useState } from 'react';
import { MediaService } from '../services/media.service';
import { AlbumResponse } from '../../../core/types/dto/response/album.response';
import { AlbumMapper } from '../../../core/mappers/album.mapper';

type Return = { albums: Album[] };

export function useLoadAlbums(): Return {
	const [albums, setAlbums] = useState<Album[] | null>(null);

	useEffect(() => {
		setAlbums(null);
		MediaService.getInstance()
			.findAllAlbums()
			.then((data: AlbumResponse[]) => {
				setAlbums(AlbumMapper.many(data));
			})
			.catch(_ => {
				setAlbums([]);
			});
	}, []);

	return { albums: albums ?? [] };
}
