import { Photo } from '@/core/types/domain/photo.model';

type Props = { photo: Photo };

export function PhotoCard({ photo }: Props): JSX.Element {
	return (
		<img
			className='w-full bg-cover'
			src={photo.urlImage}
			alt={photo.name}
			width={100}
			height={100}
		/>
	);
}
