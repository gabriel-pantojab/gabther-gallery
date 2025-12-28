import { useState } from 'react';
import { AlbumService } from '../services/album.service';

export function useAlbum() {
	const [creating, setCreating] = useState<boolean>(false);

	const createAlbum = async (
		name: string,
		albumCover?: File | null,
		parentId?: number | null,
	): Promise<void> => {
		try {
			setCreating(true);
			if (name === '') throw new Error('Name is required');
			let urlAlbumCover: string = '';
			if (albumCover !== undefined && albumCover !== null)
				urlAlbumCover = (await uploadAlbumCover(albumCover, name)) ?? '';
			await AlbumService.getInstance().create({
				name,
				urlAlbumCover,
				parentId,
			});
		} finally {
			setCreating(false);
		}
	};

	const uploadAlbumCover = async (
		file: File,
		name: string,
	): Promise<string> => {
		const { url } = await AlbumService.getInstance().uploadAlbumCover(
			file,
			name,
		);
		return url;
	};

	return { creating, createAlbum };
}
