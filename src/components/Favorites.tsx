import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { UserContext } from '../context/userContext';
import StarIcon from './icons/StarIcon';
import useFavorites from '../hooks/useFavorites';

export default function Favorites(): JSX.Element {
	const { currentUser } = useContext(UserContext);

	const { favorites, removeFavorite } = useFavorites();

	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between p-4 pb-4'>
				<h2 className='text-2xl font-bold'>Photos</h2>
			</header>

			<div
				className={`relative grid h-full min-h-screen w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`}
			>
				{favorites === null
					? new Array(12).fill(0).map((_, index) => {
							return <Skeleton key={index} height={200} />;
						})
					: favorites.map(favorite => (
							<div key={favorite.id} className='relative'>
								{currentUser !== null && (
									<button
										onClick={() => {
											removeFavorite(favorite.id);
										}}
										title='Remove from favorites'
										className='absolute left-0 top-0 p-1 text-[#B57EDC]
										transition duration-300 ease-in-out hover:text-[#8E5EDC]
									'
									>
										<StarIcon fill />
									</button>
								)}

								<Link to={`/photos/photo/${favorite.id}`}>
									<div
										className={`w-full overflow-hidden rounded-md bg-gray-200 transition duration-300 ease-in-out`}
									>
										<img
											className='w-full bg-cover'
											src={favorite.url_image}
											alt={favorite.name}
											width={100}
											height={100}
										/>
									</div>
								</Link>
							</div>
						))}
			</div>
		</section>
	);
}
