import { useContext } from 'react';
import { UserContext } from '@/context/userContext';
import { FavoriteList } from '../components/favorite-list/favorite-list';
import { useFavoriteMedia } from '../hooks/use-favorite-media';
import { useFavorite } from '../hooks/use-favorite';
import { FavoriteGalleryHeader } from '../components/favorite-gallery-header/favorite-gallery-header';

export function FavoriteGalleryContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { favorites } = useFavoriteMedia();
	const { removeFavorite } = useFavorite();

	return (
		<>
			<FavoriteGalleryHeader />

			<FavoriteList
				isLoggedIn={!!currentUser}
				media={favorites}
				eventRemoveFavorite={removeFavorite}
			/>
		</>
	);
}
