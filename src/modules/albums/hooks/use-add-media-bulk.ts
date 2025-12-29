import { ToastService } from '@/core/service/toast.service';
import { AlbumService } from '../services/album.service';

type Props = { albumId: number };
type Return = { addMediaBulk: (mediaIds: number[]) => Promise<void> };

export function useAddMediaBulk({ albumId }: Props): Return {
	const addMediaBulk = async (mediaIds: number[]) => {
		try {
			if (albumId === undefined || albumId < 0) return;
			await AlbumService.getInstance().addMediaBulk(albumId, mediaIds);
			ToastService.getInstance().success('Added!');
		} catch (error: any) {
			ToastService.getInstance().error(error.message);
		}
	};
	return { addMediaBulk };
}
