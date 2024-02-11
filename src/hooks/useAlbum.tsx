import { useState } from 'react';

import {
	insertAlbum,
	uploadAlbumCover as uploadAlbumCoverStorage,
} from '../services/album-services';

interface TypeReturnHook {
	createAlbum: (
		name: string,
		albumCover?: File | null,
		parentId?: number | null,
	) => Promise<void>;
	creating: boolean;
}

export default function useAlbum(): TypeReturnHook {
	const [creating, setCreating] = useState<boolean>(false);

	const createAlbum = async (
		name: string,
		albumCover?: File | null,
		parentId: number | null = null,
	): Promise<void> => {
		try {
			setCreating(true);
			if (name === '') throw new Error('Name is required');
			let urlAlbumCover;
			if (albumCover !== undefined && albumCover !== null)
				urlAlbumCover = await uploadAlbumCover(albumCover, name);
			await insertAlbum({ name, urlAlbumCover, parentId });
		} finally {
			setCreating(false);
		}
	};

	const uploadAlbumCover = async (
		file: File,
		name: string,
	): Promise<string> => {
		const { url } = await uploadAlbumCoverStorage(file, name);
		return url;
	};

	return { createAlbum, creating };
}
