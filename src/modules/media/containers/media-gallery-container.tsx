import { useContext } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { UserContext } from '@/context/userContext';
import UploadPhotoDD from '@/components/UploadPhotoDD';
import { MediaGallery } from '../components/media-gallery/media-gallery';
import { GalleryHeader } from '../components/gallery-header/gallery-header';
import { useLoadAlbums } from '../hooks/use-load-albums';
import { useAddMediaToAlbum } from '../hooks/use-add-media-to-album';
import { useUploadMedia } from '../hooks/use-upload-media';
import { useBulkDeleteMedia } from '../hooks/use-bulk-delete-media';
import useMedia from '../hooks/use-media';

export function MediaGalleryContainer() {
	const { currentUser } = useContext(UserContext);
	const { photos } = useMedia();
	const { albums } = useLoadAlbums();
	const { addMediaToAlbum } = useAddMediaToAlbum();
	const { uploadMedia } = useUploadMedia();
	const { bulkDeleteMedia } = useBulkDeleteMedia();

	const addSelectedPhotosToAlbum = async (
		ids: number[],
		albumId: number,
	): Promise<void> => {
		await addMediaToAlbum(ids, albumId);
	};

	const handleUploadMedia = async (files: File[]) => {
		await uploadMedia(files);
	};

	const handleDeleteMedia = async (media: Photo[]) => {
		const data = media.map(m => ({ id: m.id, name: m.name }));
		await bulkDeleteMedia(data);
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
					eventDeleteSelectedMedia={handleDeleteMedia}
				/>
			</UploadPhotoDD>
		</>
	);
}
