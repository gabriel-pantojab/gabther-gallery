import { useEffect, useState } from 'react';
import { Album } from '@/core/types/domain/album.model';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { ToastService } from '@/core/service/toast.service';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { AlbumResponse } from '@/core/types/dto/response/album.response';
import { AlbumMapper } from '@/core/mappers/album.mapper';
import { AlbumService } from '../services/album.service';

type Return = { media: Photo[] | null; subAlbums: Album[] | null };

export function useMediaAlbum(albumId: number): Return {
	const [media, setMedia] = useState<Photo[] | null>(null);
	const [subAlbums, setSubAlbums] = useState<Album[] | null>(null);

	useEffect(() => {
		getMedia();
		getSubAlbums();
	}, [albumId]);

	const getMedia = async (): Promise<void> => {
		try {
			const media: PhotoResponse[] =
				await AlbumService.getInstance().findMedia(albumId);
			setMedia(PhotoMapper.many(media));
		} catch (error: any) {
			// TODO: create service for error management
			ToastService.getInstance().error(error.message);
			setMedia([]);
		}
	};

	const getSubAlbums = async (): Promise<void> => {
		try {
			const subAlbums: AlbumResponse[] =
				await AlbumService.getInstance().findSubAlbums(albumId);
			setSubAlbums(AlbumMapper.many(subAlbums));
		} catch (error: any) {
			// TODO: create service for error management
			ToastService.getInstance().error(error.message);
			setSubAlbums([]);
		}
	};

	return {
		media,
		subAlbums,
	};
}
