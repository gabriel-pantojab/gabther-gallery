import { Photo } from '../../models/photo.model';

type Props = { photo: Photo };

export function VideoCard({ photo }: Props): JSX.Element {
	return (
		<video
			className='w-full bg-cover'
			src={photo.urlImage}
			width={100}
			height={100}
			controls
			autoPlay={false}
		/>
	);
}
