import { Photo } from '@/core/types/domain/photo.model';

type Props = { photo: Photo };

export function PhotoCard({ photo }: Props): JSX.Element {
	return (
		<img
			// TODO: revisar estilos
			className='aspect-auto h-full w-full object-contain'
			src={photo.urlImage}
			alt={photo.name}
			width={100}
			height={100}
		/>
	);
}
