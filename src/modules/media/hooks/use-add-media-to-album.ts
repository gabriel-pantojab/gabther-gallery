import { Id as ToastId } from 'react-toastify';
import { ToastService } from '@/core/service/toast.service';
import { MediaService } from '../services/media.service';

type Return = {
	addMediaToAlbum: (ids: number[], albumId: number) => Promise<void>;
};

export function useAddMediaToAlbum(): Return {
	const addMediaToAlbum = async (ids: number[], albumId: number) => {
		const toastId: ToastId = ToastService.getInstance().loading('Process...');
		try {
			await MediaService.getInstance().insertPhotosToAlbum(ids, albumId);
			ToastService.getInstance().success('Added', toastId);
		} catch (error: any) {
      // TODO: manejar los errores en un service
			let message = 'Unknown error';
			if (error.code === '23505') {
				message = 'Photo already added';
			}
			ToastService.getInstance().error(message, toastId);
		}
	};

	return { addMediaToAlbum };
}
