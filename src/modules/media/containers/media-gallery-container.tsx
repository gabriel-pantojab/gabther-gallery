import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import UploadPhotoDD from '@/components/UploadPhotoDD';
import { MediaGallery } from '../components/media-gallery/media-gallery';
import useMedia from '../hooks/use-media';
import { useAddMediaToAlbum } from '../hooks/use-add-media-to-album';
import { useLoadAlbums } from '../hooks/use-load-albums';
import { GalleryHeader } from '../components/gallery-header/gallery-header';

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
		<>
			<GalleryHeader isLoggedIn={!!currentUser} />

			<UploadPhotoDD enableUpload={!!currentUser}>
				<MediaGallery
					isLogged={!!currentUser}
					photos={photos}
					albums={albums}
					eventAddSelectedMediaToAlbum={addSelectedPhotosToAlbum}
				/>
			</UploadPhotoDD>
		</>
	);
}
