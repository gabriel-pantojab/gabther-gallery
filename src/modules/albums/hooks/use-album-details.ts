import { useEffect, useState } from 'react';
import { ToastService } from '@/core/service/toast.service';
import { Album } from '@/core/types/domain/album.model';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { AlbumMapper } from '@/core/mappers/album.mapper';
import { AlbumService } from '../services/album.service';

type Return = { album: Album | null };
export function useAlbumDetails(albumId: number): Return {
	const [album, setAlbum] = useState<Album | null>(null);

	useEffect(() => {
		getAlbum();
	}, [albumId]);

	const getAlbum = async () => {
		try {
			const album: AlbumResponse =
				await AlbumService.getInstance().find(albumId);
			setAlbum(AlbumMapper.single(album));
		} catch (error: any) {
			setAlbum(null);
			ToastService.getInstance().error(error.message);
		}
	};

	return { album };
}
