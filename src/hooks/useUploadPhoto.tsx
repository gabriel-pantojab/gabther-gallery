import { useState } from 'react';
import { toast } from 'react-toastify';

import supabase from '../services/supabase-service';
import { insertPhoto, uploadPhoto } from '../services/photo-service';

interface TypeReturnHook {
	handleUploadPhotos: (files: File[]) => void;
	uploading: boolean;
}

export default function useUploadPhoto(): TypeReturnHook {
	const [uploading, setUploading] = useState(false);

	const uploadFiles = async (files: File[]): Promise<any> => {
		try {
			setUploading(true);
			const promises = files.map(async file => await uploadPhoto(file));
			const results = await Promise.all(promises);

			const promisesInsert = results.map(async result => {
				const { data } = supabase.storage
					.from('photos')
					.getPublicUrl(result.path as string);
				await insertPhoto({
					name: result.path,
					urlImage: data.publicUrl,
				});
			});

			await Promise.all(promisesInsert);

			return results;
		} finally {
			setUploading(false);
		}
	};

	const handleUploadPhotos = (files: File[]): void => {
		const id = toast.loading('Uploading...');
		uploadFiles(files)
			.then(_ => {
				toast.update(id, {
					render: 'Photo uploaded successfully!',
					type: 'success',
					isLoading: false,
					autoClose: 5000,
					closeOnClick: true,
				});
			})
			.catch(error => {
				toast.update(id, {
					render: 'Error, ' + error.message,
					type: 'error',
					isLoading: false,
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			});
	};

	return { handleUploadPhotos, uploading };
}
