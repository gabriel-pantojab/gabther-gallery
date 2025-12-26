import { useState } from 'react';
import { Photo } from '../../../../core/types/domain/photo.model';
import { PhotoCard } from '../photo-card/photo-card';
import { CoverMediaElement } from './cover-media-element';
import { ToggleSelect } from './toggle-select';
import { VideoCard } from '../video-card/video-card';
import { isPhoto, isVideo } from '@/utils/multimedia';

type Props = {
	photo: Photo;
	isSelected: boolean;
	isLogged: boolean;
	addSelectedId: (id: number) => void;
	removeSelectedId: (id: number) => void;
};

export function MediaCard({
	photo,
	isSelected,
	isLogged,
	addSelectedId: addIdSelected,
	removeSelectedId: removeIdSelected,
}: Props): JSX.Element {
	const [isHover, setIsHover] = useState<boolean>(false);

	let MediaElement: JSX.Element | null = null;

	if (isPhoto(photo.urlImage)) {
		MediaElement = <PhotoCard photo={photo} />;
	}

	if (isVideo(photo.urlImage)) {
		MediaElement = <VideoCard photo={photo} />;
	}

	return (
		<div
			style={{
				animationTimeline: 'view()',
				animationRange: 'entry 20% cover 30%',
			}}
			className='relative animate-reveal transition duration-300 ease-in-out'
			onMouseEnter={() => {
				if (!isLogged) return;
				setIsHover(true);
			}}
			onMouseLeave={() => {
				if (!isLogged) return;
				setIsHover(false);
			}}
		>
			<ToggleSelect
				photoId={photo.id}
				isSelected={isSelected}
				isHover={isHover}
				addIdSelected={addIdSelected}
				removeIdSelected={removeIdSelected}
			/>

			<CoverMediaElement
				isSelected={isSelected}
				navigate={true}
				photoId={photo.id}
			>
				{MediaElement}
			</CoverMediaElement>
		</div>
	);
}
