import { ToastService } from '@/core/service/toast.service';
import { MediaService } from '../services/media.service';

type Return = {
	bulkDeleteMedia: (data: { id: number; name: string }[]) => Promise<void>;
};

export function useBulkDeleteMedia(): Return {
	const bulkDeleteMedia = async (data: { id: number; name: string }[]) => {
		const toastId = ToastService.getInstance().loading('Deleting...');
		try {
			await MediaService.getInstance().bulkDeleteMedia(data);
			ToastService.getInstance().success('Deleted!', toastId);
		} catch (error: any) {
			ToastService.getInstance().error(error.message, toastId);
		}
	};

	return { bulkDeleteMedia };
}
