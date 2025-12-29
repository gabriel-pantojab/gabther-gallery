import { useEffect, useState } from 'react';
import { ToastService } from '@/core/service/toast.service';
import { Photo } from '@/core/types/domain/photo.model';
import { PhotoResponse } from '@/core/types/dto/response/photo.response';
import { PhotoMapper } from '@/core/mappers/photo.mapper';
import { AlbumService } from '../services/album.service';

type Return = { media: Photo[] | null };

export function useFindExternalMedia(albumId: number): Return {
	const [media, setMedia] = useState<Photo[] | null>(null);

	useEffect(() => {
		if (albumId !== -1) {
			getMedia();
		}
	}, [albumId]);

	const getMedia = async () => {
		try {
			const media: PhotoResponse[] =
				await AlbumService.getInstance().findExternalMedia(albumId);
			setMedia(PhotoMapper.many(media));
		} catch (error: any) {
			setMedia([]);
			ToastService.getInstance().error(error.message);
		}
	};

	return { media };
}
