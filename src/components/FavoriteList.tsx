import Skeleton from 'react-loading-skeleton';

import useFavorites from '../hooks/useFavorites';
import FavoritePhoto from './FavoritePhoto';

export default function FavoriteList(): JSX.Element {
	const { favorites, removeFavorite } = useFavorites();

	return (
		<div
			className={`relative grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`}
		>
			{favorites === null
				? new Array(12).fill(0).map((_, index) => {
						return <Skeleton key={index} height={200} />;
					})
				: favorites.map(favorite => (
						<FavoritePhoto
							key={favorite.id}
							photo={favorite}
							removeFavorite={removeFavorite}
						/>
					))}
		</div>
	);
}
