import { useEffect, useState } from 'react';

import supabase from '../services/supabase-service';
import { getPhotosByAlbum, getSubAlbumsById } from '../services/album-services';

import { type PhotoDB } from '../models/photo.interface';
import { type AlbumDB } from '../models/album.interface';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
	subAlbums: AlbumDB[] | null;
}

export default function useFilesAlbum({
	idAlbum,
}: {
	idAlbum: number;
}): TypeReturnHook {
	const [photos, setPhotos] = useState<PhotoDB[] | null>([]);
	const [subAlbums, setSubAlbums] = useState<AlbumDB[] | null>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getPhotos();
	}, [idAlbum]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getSubAlbums();
	}, [idAlbum]);

	useEffect(() => {
		const channel = supabase
			.channel('album-insert')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'photo_album' },
				(_: any) => {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					getPhotos();
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, [idAlbum]);

	useEffect(() => {
		const channel = supabase
			.channel('album-delete')
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'photo_album' },
				(payload: any) => {
					const idPhoto = payload.old.id_photo;
					setPhotos(prev => {
						if (prev === null) return [];
						return prev.filter(photo => photo.id !== idPhoto);
					});
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, [idAlbum]);

	useEffect(() => {
		const channel = supabase
			.channel('album-insert-album')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'album' },
				(_: any) => {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					getSubAlbums();
				},
			)
			.subscribe();

		return () => {
			void channel.unsubscribe();
		};
	}, [idAlbum]);

	const getPhotos = async (): Promise<void> => {
		try {
			setPhotos(null);
			const photos = await getPhotosByAlbum(idAlbum);
			setPhotos(photos);
		} catch (error) {
			setPhotos([]);
		}
	};

	const getSubAlbums = async (): Promise<void> => {
		try {
			setSubAlbums(null);
			const subAlbums = await getSubAlbumsById(idAlbum);
			setSubAlbums(subAlbums);
		} catch (error) {
			setSubAlbums([]);
		}
	};

	return { photos, subAlbums };
}
