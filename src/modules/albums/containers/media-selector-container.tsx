import { useRef } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { MediaCard } from '@/shared/components/media-card/media-card';
import { MediaSelector } from '@/shared/constants/media-selector/media-selector';
import { useFindExternalMedia } from '../hooks/use-find-external-media';
import { useAddMediaBulk } from '../hooks/use-add-media-bulk';

type Props = { albumId?: number; close: () => void };

export function MediaSelectorContainer({ albumId, close }: Props): JSX.Element {
	const selectedIds = useRef<number[]>([]);
	const { media } = useFindExternalMedia(albumId ?? -1);
	const { addMediaBulk } = useAddMediaBulk({ albumId: albumId ?? -1 });

	const handleSelectedIds = (ids: number[]): void => {
		selectedIds.current = ids;
	};

	const handleAddToAlbum = (): void => {
		addMediaBulk(selectedIds.current);
		close();
	};

	return (
		<MediaSelector
			media={media}
			render={(media: Photo) => <MediaCard media={media} />}
			eventSelectedIds={handleSelectedIds}
			close={close}
		>
			<button
				onClick={handleAddToAlbum}
				className='rounded-md bg-blue-500 px-4 py-1 text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600'
			>
				Add to album
			</button>
		</MediaSelector>
	);
}
