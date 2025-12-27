import { Photo } from '@/core/types/domain/photo.model';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';
import { Navigable } from '@/shared/components/navigable/navigable';
import { isPhoto, isVideo } from '@/utils/multimedia';
import { PhotoCard } from '../photo-card/photo-card';
import { VideoCard } from '../video-card/video-card';

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
	addSelectedId,
	removeSelectedId,
}: Props): JSX.Element {
	const to: string = `/gallery/media/${photo.id}`;
	let MediaElement: JSX.Element | null = null;

	if (isPhoto(photo.urlImage)) {
		MediaElement = <PhotoCard photo={photo} />;
	}

	if (isVideo(photo.urlImage)) {
		MediaElement = <VideoCard photo={photo} />;
	}

	const handleToggleSelect = () => {
		if (isSelected) {
			removeSelectedId(photo.id);
			return;
		}
		addSelectedId(photo.id);
	};

	return (
		<div
			style={{
				animationTimeline: 'view()',
				animationRange: 'entry 20% cover 30%',
			}}
			className='relative animate-reveal transition duration-300 ease-in-out'
		>
			<MediaWrapper
				isLoggedIn={isLogged}
				isSelected={isSelected}
				eventToggleSelect={handleToggleSelect}
			>
				<Navigable enabled={!isSelected} to={to}>
					{MediaElement}
				</Navigable>
			</MediaWrapper>
		</div>
	);
}
