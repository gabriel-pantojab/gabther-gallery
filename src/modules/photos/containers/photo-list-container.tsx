import { UserContext } from '@/context/userContext';
import { useContext } from 'react';
import { PhotoList } from '../components/photo-list/photo-list';
import usePhotos from '../hooks/use-photos';

export function PhotoListContainer() {
	const { currentUser } = useContext(UserContext);
	const { photos } = usePhotos();

	const addSelectedPhotosToAlbum = async (
		ids: number[],
		albumId: number,
	): Promise<void> => {
		console.log({ ids, albumId });
	};

	return (
		<PhotoList
			isLogged={!!currentUser}
			photos={photos}
			eventAddSelectedPhotosToAlbum={addSelectedPhotosToAlbum}
		/>
	);
}
