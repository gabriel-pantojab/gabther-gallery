import { ToastService } from '@/core/service/toast.service';
import { MediaService } from '../services/media.service';

type Return = {
	removeFavorite: (id: number) => Promise<void>;
};

export function useFavorite(): Return {
	const removeFavorite = async (id: number) => {
		const toastId = ToastService.getInstance().loading('Removing...');
		try {
			await MediaService.getInstance().updateFavorite({
				is_favorite: false,
				photo_id: id,
			});
			ToastService.getInstance().success('Removed!', toastId);
		} catch (error: any) {
			ToastService.getInstance().error(error.message, toastId);
		}
	};

	return { removeFavorite };
}
