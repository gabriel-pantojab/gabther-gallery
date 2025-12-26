import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { MediaViewer } from '../components/media-viewer';
import { useMediaViewer } from '../hooks/use-media-viewer';

export function MediaViewerContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { photoId } = useParams();
	const { media, isFavorite, toggleFavorite, deleteMedia } = useMediaViewer(
		Number(photoId),
	);

	return (
		<MediaViewer
			isFavorite={isFavorite}
			isLoggedIn={!!currentUser}
			media={media}
			toggleFavorite={toggleFavorite}
			deleteMedia={deleteMedia}
		/>
	);
}
