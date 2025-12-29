import { StorageService } from '@/core/service/storage.service';
import { ToastService } from '@/core/service/toast.service';
import { CreateMediaRequest } from '@/core/types/dto/request/create-media-request';
import { MediaService } from '../services/media.service';

type Return = {
	uploadMedia: (files: File[]) => Promise<void>;
};

export function useUploadMedia(): Return {
	const uploadMedia = async (files: File[]) => {
		const toastId = ToastService.getInstance().loading('Uploading...');
		try {
			const results = await MediaService.getInstance().bulkUploadMedia(files);
			const data: CreateMediaRequest[] = results
				.filter(r => r !== null)
				.map(({ path }) => {
					const publicUrl: string =
						StorageService.getInstance().getPublicUrl(path);
					return {
						name: path,
						url_image: publicUrl,
					};
				});
			await MediaService.getInstance().bulkCreate(data);
			ToastService.getInstance().success('Uploaded!', toastId);
		} catch (error: any) {
			ToastService.getInstance().error(error.message, toastId);
		}
	};

	return { uploadMedia };
}
