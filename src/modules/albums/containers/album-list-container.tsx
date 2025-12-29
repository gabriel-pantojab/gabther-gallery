import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { AlbumGallery } from '../components/album-gallery/album-gallery';
import { useAlbums } from '../hooks/use-albums';

export function AlbumListContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { albums } = useAlbums();

	return <AlbumGallery albums={albums} isLoggedIn={!!currentUser} />;
}
