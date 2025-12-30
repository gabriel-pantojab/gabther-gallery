import { useState } from 'react';
import Swal from 'sweetalert2';
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
	eventDeleteSelectedMedia: (selectedMedia: Photo[]) => {};
};

export function MediaGallery({
	photos = [],
	albums = [],
	isLogged = false,
	eventAddSelectedMediaToAlbum,
	eventDeleteSelectedMedia,
}: Props): JSX.Element {
	const [selectedMedia, setSelectedMedia] = useState<Map<number, Photo>>(
		new Map(),
	);
	const [openSelectedAlbum, setOpenSelectedAlbum] = useState<boolean>(false);

	const handleAddSelectedMediaToAlbum = (albumId: number): void => {
		if (albumId >= 0 && selectedMedia.size) {
			eventAddSelectedMediaToAlbum([...selectedMedia.keys()], albumId);
		}
		setOpenSelectedAlbum(false);
		setSelectedMedia(new Map());
	};

	const handleDeleteSelectedMedia = async () => {
		if (selectedMedia.size) {
			Swal.fire({
				title: 'Are you sure?',
				text: 'They will be deleted from the album.',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: 'No, keep it',
			}).then(async result => {
				if (result.isConfirmed) {
					eventDeleteSelectedMedia([...selectedMedia.values()]);
					setSelectedMedia(new Map());
				}
			});
		}
	};

	const handleSelectMedia = (media: Photo) => {
		setSelectedMedia(prev => {
			const temp = new Map(prev);
			temp.has(media.id) ? temp.delete(media.id) : temp.set(media.id, media);
			return temp;
		});
	};

	return (
		<article className='relative w-full'>
			<SelectionToolbar count={selectedMedia.size}>
				<button
					onClick={() => {
						setOpenSelectedAlbum(true);
					}}
					className='flex cursor-pointer items-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
				>
					<PlusIcon />
				</button>

				<button
					className='flex cursor-pointer items-center gap-1 p-1 text-sm text-red-500 hover:bg-gray-200'
					onClick={handleDeleteSelectedMedia}
				>
					<TrashIcon />
				</button>
			</SelectionToolbar>

			<MediaList
				isLoggedIn={isLogged}
				media={photos}
				selectedIds={new Set([...selectedMedia.keys()])}
				eventSelectMedia={handleSelectMedia}
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
