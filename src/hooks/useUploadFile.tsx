import { useContext, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { insertFile, uploadFile } from '../utils/supabase';

interface TypeReturnHook {
	uploadFiles: (files: File[]) => Promise<any>;
	uploading: boolean;
}

export default function useUploadFile(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);

	const [uploading, setUploading] = useState(false);

	const uploadFiles = async (files: File[]): Promise<any> => {
		try {
			setUploading(true);
			const promises = files.map(
				async file => await uploadFile(file, supabase),
			);
			const results = await Promise.all(promises);

			const promisesInsert = results.map(async result => {
				const { data } = supabase.storage
					.from('photos')
					.getPublicUrl(result.path);
				await insertFile({
					name: result.path,
					urlImage: data.publicUrl,
					supabase,
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
