import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { MediaGallery } from '../components/media-gallery/media-gallery';
import useMedia from '../hooks/use-media';
import { useAddMediaToAlbum } from '../hooks/use-add-media-to-album';
import { useLoadAlbums } from '../hooks/use-load-albums';

export function MediaGalleryContainer() {
	const { currentUser } = useContext(UserContext);
	const { photos } = useMedia();
	const { albums } = useLoadAlbums();
	const { addMediaToAlbum: addPhotosToAlbum } = useAddMediaToAlbum();

	const addSelectedPhotosToAlbum = async (
		ids: number[],
		albumId: number,
	): Promise<void> => {
		await addPhotosToAlbum(ids, albumId);
	};

	return (
		<MediaGallery
			isLogged={!!currentUser}
			photos={photos}
			albums={albums}
			eventAddSelectedMediaToAlbum={addSelectedPhotosToAlbum}
		/>
	);
}
