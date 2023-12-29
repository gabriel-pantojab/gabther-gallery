import { useContext, useState } from 'react';
import { SupabaseContext } from '../context/supabaseContext';

interface TypeReturnHook {
	uploadFiles: (files: File[]) => Promise<any>;
	uploading: boolean;
}

export default function useUploadFile(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);

	const [uploading, setUploading] = useState(false);

	const uploadFile = async (file: File): Promise<any> => {
		const { data, error } = await supabase.storage
			.from('photos')
			.upload(`${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error !== null) {
			throw error;
		}
		return data;
	};

	const insertFile = async ({
		name,
		urlImage,
		idAlbum,
	}: {
		name: string;
		urlImage: string;
		idAlbum?: number;
	}): Promise<void> => {
		const file: {
			name: string;
			url_image: string;
			id_album?: number;
		} = { name, url_image: urlImage };

		if (idAlbum !== undefined) {
			file.id_album = idAlbum;
		}

		const { error } = await supabase.from('photo').insert(file);

		if (error !== null) {
			throw error;
		}
	};

	const uploadFiles = async (files: File[]): Promise<any> => {
		try {
			setUploading(true);
			const promises = files.map(async file => await uploadFile(file));
			const results = await Promise.all(promises);

			const promisesInsert = results.map(async result => {
				const { data } = supabase.storage
					.from('photos')
					.getPublicUrl(result.path);
				await insertFile({
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

	return { uploadFiles, uploading };
}
