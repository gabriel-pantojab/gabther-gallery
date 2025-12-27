import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { AlbumList } from '../components/album-list/album-list';
import { useAlbums } from '../hooks/use-albums';

export function AlbumListContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { albums } = useAlbums();

	return <AlbumList albums={albums} isLoggedIn={!!currentUser} />;
}
