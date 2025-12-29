import { Photo } from '@/core/types/domain/photo.model';
import { isPhoto, isVideo } from '@/utils/multimedia';
import { PhotoCard } from './photo-card/photo-card';
import { VideoCard } from './video-card/video-card';

type Props = { media: Photo | null };

export function MediaCard({ media }: Props): JSX.Element {
	if (media === null) return <div>Unsuported Media</div>;

	if (isPhoto(media.urlImage)) {
		return <PhotoCard photo={media} />;
	}

	if (isVideo(media.urlImage)) {
		return <VideoCard photo={media} />;
	}

	return <div>Unsuported Media</div>;
}
