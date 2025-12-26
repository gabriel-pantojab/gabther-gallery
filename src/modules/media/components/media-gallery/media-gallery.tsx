import { useState } from 'react';
import { Photo } from '../../../../core/types/domain/photo.model';
import { MediaCard } from '../media-card/media-card';
import { MediaSelectedOptions } from '../media-selected-options/media-selected-options';
import PlusIcon from '@/components/icons/PlusIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import { SelectAlbum } from '../select-album/select-album';
import { Album } from '@/core/types/domain/album.model';

type Props = {
	photos: Photo[];
	albums: Album[];
	isLogged: boolean;
	eventAddSelectedPhotosToAlbum: (ids: number[], albumId: number) => void;
};

export function MediaGallery({
	photos = [],
	albums = [],
	isLogged = false,
	eventAddSelectedPhotosToAlbum,
}: Props): JSX.Element {
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [openSelectedAlbum, setOpenSelectedAlbum] = useState<boolean>(false);
	const isEmpty: boolean = photos.length === 0;

	const handleAddSelectedPhotosToAlbum = (albumId: number): void => {
		if (albumId >= 0 && selectedIds?.length) {
			eventAddSelectedPhotosToAlbum(selectedIds, albumId);
		}
		setOpenSelectedAlbum(false);
		setSelectedIds([]);
	};

	const addSelectedId = (id: number): void => {
		setSelectedIds(prevIds => (prevIds ? [...prevIds, id] : [id]));
	};

	const removeSelectedId = (id: number): void => {
		setSelectedIds(prevIds =>
			prevIds ? prevIds.filter(prevId => prevId !== id) : [],
		);
	};

	const Empty = () => {
		return (
			<div className='col-span-full flex items-center justify-center py-12'>
				<p className='text-gray-500'>No Photos 🤧</p>
			</div>
		);
	};

	const PhotoGrid = ({ children }: { children: React.ReactNode }) => {
		return (
			<div className='relative grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4'>
				{children}
			</div>
		);
	};

	return (
		<article className='relative w-full'>
			<MediaSelectedOptions countSelectedIds={selectedIds.length}>
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
			</MediaSelectedOptions>

			<section className='relative flex w-full flex-col gap-2'>
				<PhotoGrid>
					{isEmpty ? (
						<Empty />
					) : (
						photos.map(photo => {
							return (
								<MediaCard
									key={photo.id}
									photo={photo}
									isLogged={isLogged}
									isSelected={selectedIds.includes(photo.id)}
									addSelectedId={addSelectedId}
									removeSelectedId={removeSelectedId}
								/>
							);
						})
					)}
				</PhotoGrid>
			</section>

			{openSelectedAlbum && (
				<SelectAlbum
					albums={albums}
					eventSelectAlbum={handleAddSelectedPhotosToAlbum}
				/>
			)}
		</article>
	);
}
