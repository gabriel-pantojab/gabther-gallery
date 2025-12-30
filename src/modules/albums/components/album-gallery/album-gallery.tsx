import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Album } from '@/core/types/domain/album.model';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';
import { AlbumList } from '../album-list/album-list';

type Props = {
	isLoggedIn: boolean;
	albums: Album[] | null;
};

export function AlbumGallery({ isLoggedIn, albums }: Props): JSX.Element {
	const [selectedAlbums, setSelectedAlbums] = useState<Map<number, Album>>(
		new Map(),
	);
	const gridClass: string =
		'grid w-full grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4';

	if (albums === null) {
		return (
			<section className={gridClass}>
				{new Array(12).fill(0).map((_, index) => {
					return <Skeleton key={index} height={200} />;
				})}
			</section>
		);
	}

	if (albums.length === 0) {
		return (
			<section className={gridClass}>
				<p className='text-center text-gray-500'>No albums 🤧</p>
			</section>
		);
	}

	const handleSelectAlbum = (album: Album) => {
		setSelectedAlbums(prev => {
			const temp = new Map(prev);
			temp.has(album.id) ? temp.delete(album.id) : temp.set(album.id, album);
			return temp;
		});
	};

	return (
		<>
			<SelectionToolbar count={selectedAlbums.size}>
				<>{/* DUMMY */}</>
			</SelectionToolbar>

			<AlbumList
				isLoggedIn={isLoggedIn}
				albums={albums}
				selectedIds={new Set([...selectedAlbums.keys()])}
				eventSelectAlbum={handleSelectAlbum}
			/>
		</>
	);
}
