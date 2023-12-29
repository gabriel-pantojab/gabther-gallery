import { type PhotoDB } from '../models/photo.interface';

interface PhotoListProps {
	photos: PhotoDB[];
}

export default function PhotoList({ photos }: PhotoListProps): JSX.Element {
	return (
		<>
			{photos.map(photo => {
				return (
					<div
						key={photo.id}
						style={{
							animationTimeline: 'view()',
							animationRange: 'entry 20% cover 30%',
						}}
						className={`
          animate-reveal
        overflow-hidden rounded-md bg-gray-200
        `}
					>
						<img
							className='w-full bg-cover'
							src={photo.url_image}
							alt={photo.name}
							width={100}
							height={100}
						/>
					</div>
				);
			})}
		</>
	);
}
