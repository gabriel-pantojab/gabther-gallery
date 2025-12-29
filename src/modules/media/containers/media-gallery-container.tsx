import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import UploadPhotoDD from '@/components/UploadPhotoDD';
import { MediaGallery } from '../components/media-gallery/media-gallery';
import useMedia from '../hooks/use-media';
import { useAddMediaToAlbum } from '../hooks/use-add-media-to-album';
import { useLoadAlbums } from '../hooks/use-load-albums';
import { GalleryHeader } from '../components/gallery-header/gallery-header';
import { useUploadMedia } from '../hooks/use-upload-media';

export function MediaGalleryContainer() {
	const { currentUser } = useContext(UserContext);
	const { photos } = useMedia();
	const { albums } = useLoadAlbums();
	const { addMediaToAlbum } = useAddMediaToAlbum();
	const { uploadMedia } = useUploadMedia();

	const addSelectedPhotosToAlbum = async (
		ids: number[],
		albumId: number,
	): Promise<void> => {
		await addMediaToAlbum(ids, albumId);
	};

	const handleUploadMedia = async (files: File[]) => {
		await uploadMedia(files);
	};

	// TODO: refactor, this container shoulb be only for MediaGallery
	return (
		<>
			<GalleryHeader
				eventUploadMedia={handleUploadMedia}
				isLoggedIn={!!currentUser}
			/>

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
