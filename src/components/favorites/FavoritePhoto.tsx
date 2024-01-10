import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { type PhotoDB } from '../../models/photo.interface';
import StarIcon from '../icons/StarIcon';
import { UserContext } from '../../context/userContext';

interface FavoritePhotoProps {
	photo: PhotoDB;
	removeFavorite: (id: number) => void;
}

export default function FavoritePhoto({
	photo,
	removeFavorite,
}: FavoritePhotoProps): JSX.Element {
	const { currentUser } = useContext(UserContext);

	return (
		<div key={photo.id} className='relative'>
			{currentUser !== null && (
				<button
					onClick={() => {
						removeFavorite(photo.id);
					}}
					title='Remove from favorites'
					className='absolute left-0 top-0 p-1 text-[#B57EDC]
  transition duration-300 ease-in-out hover:text-[#8E5EDC]
'
				>
					<StarIcon fill />
				</button>
			)}

			<Link to={`/photos/photo/${photo.id}`}>
				<div
					className={`w-full overflow-hidden rounded-md bg-gray-200 transition duration-300 ease-in-out`}
				>
					<img
						className='w-full bg-cover'
						src={photo.url_image}
						alt={photo.name}
						width={100}
						height={100}
					/>
				</div>
			</Link>
		</div>
	);
}
