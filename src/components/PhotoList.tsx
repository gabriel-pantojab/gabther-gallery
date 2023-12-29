import { type PhotoDB } from '../models/photo.interface';
import CardPhoto from './CardPhoto';

interface PhotoListProps {
	photos: PhotoDB[];
}

export default function PhotoList({ photos }: PhotoListProps): JSX.Element {
	return (
		<>
			{photos.map(photo => {
				return <CardPhoto key={photo.id} photo={photo} />;
			})}
		</>
	);
}
