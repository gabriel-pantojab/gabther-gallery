import { Link } from 'react-router-dom';
import { type PhotoDB } from '../models/photo.interface';

interface CardPhotoProps {
	photo: PhotoDB;
}

export default function CardPhoto({ photo }: CardPhotoProps): JSX.Element {
	return (
		<Link to={`/photos/photo/${photo.id}`}>
			<div
				style={{
					animationTimeline: 'view()',
					animationRange: 'entry 20% cover 30%',
				}}
				className={`animate-reveal overflow-hidden rounded-md bg-gray-200`}
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
	);
}
