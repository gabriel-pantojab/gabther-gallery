import { useState } from 'react';
import { Photo } from '@/core/types/domain/photo.model';
import { Album } from '@/core/types/domain/album.model';
import TrashIcon from '@/components/icons/TrashIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';
import { SelectAlbum } from '../select-album/select-album';
import { MediaList } from '../media-list/media-list';

type Props = {
	photos: Photo[];
	albums: Album[];
	isLogged: boolean;
	eventAddSelectedMediaToAlbum: (ids: number[], albumId: number) => void;
};

export function MediaGallery({
	photos = [],
	albums = [],
	isLogged = false,
	eventAddSelectedMediaToAlbum,
}: Props): JSX.Element {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
	const [openSelectedAlbum, setOpenSelectedAlbum] = useState<boolean>(false);

	const handleAddSelectedMediaToAlbum = (albumId: number): void => {
		if (albumId >= 0 && selectedIds.size) {
			eventAddSelectedMediaToAlbum([...selectedIds], albumId);
		}
		setOpenSelectedAlbum(false);
		setSelectedIds(new Set());
	};

	const handleAddId = (id: number): void => {
		setSelectedIds(prev => {
			const temp = new Set(prev);
			temp.add(id);
			return temp;
		});
	};

	const handleRemoveId = (id: number): void => {
		setSelectedIds(prev => {
			const temp = new Set(prev);
			temp.delete(id);
			return temp;
		});
	};

	return (
		<article className='relative w-full'>
			<SelectionToolbar count={selectedIds.size}>
				<button
					onClick={() => {
						setOpenSelectedAlbum(true);
					}}
					className='flex cursor-pointer items-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
				>
					<PlusIcon />
				</button>

				<button className='flex cursor-pointer items-center gap-1 p-1 text-sm text-red-500 hover:bg-gray-200'>
					<TrashIcon />
				</button>
			</SelectionToolbar>

			<MediaList
				isLoggedIn={isLogged}
				media={photos}
				selectedIds={selectedIds}
				eventAddId={handleAddId}
				eventRemoveId={handleRemoveId}
			/>

			{openSelectedAlbum && (
				<SelectAlbum
					albums={albums}
					eventSelectAlbum={handleAddSelectedMediaToAlbum}
				/>
			)}
		</article>
	);
}
