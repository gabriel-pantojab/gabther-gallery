import { useContext, useEffect, useState } from 'react';

import { type PhotoDB } from '../models/photo.interface';
import { getPhotosByAlbum, getSubAlbumsById } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import { type AlbumDB } from '../models/album.interface';

interface TypeReturnHook {
	photos: PhotoDB[] | null;
	subAlbums: AlbumDB[] | null;
}

export default function usePhotosAlbum({
	idAlbum,
}: {
	idAlbum: number;
}): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
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
			channel.unsubscribe();
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
			channel.unsubscribe();
		};
	}, [idAlbum]);

	const getPhotos = async (): Promise<void> => {
		try {
			const photos = await getPhotosByAlbum(idAlbum, supabase);
			setPhotos(photos);
		} catch (error) {
			console.log(error);
		}
	};

	const getSubAlbums = async (): Promise<void> => {
		try {
			const subAlbums = await getSubAlbumsById(idAlbum, supabase);
			setSubAlbums(subAlbums);
		} catch (error) {
			console.log(error);
		}
	};

	return { photos, subAlbums };
}
