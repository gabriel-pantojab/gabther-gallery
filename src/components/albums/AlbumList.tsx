import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { type AlbumDB } from '../../models/album.interface';
import CardAlbum from './CardAlbum';

interface AlbumListProps {
	albums: AlbumDB[] | null;
	idsSelected: number[];
	addIdSelected: (id: number) => void;
	removeIdSelected: (id: number) => void;
}

export default function AlbumList({
	albums,
	idsSelected,
	addIdSelected,
	removeIdSelected,
}: AlbumListProps): JSX.Element {
	return (
		<div className='grid w-full grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4'>
			{albums === null ? (
				new Array(12).fill(0).map((_, index) => {
					return <Skeleton key={index} height={200} />;
				})
			) : albums.length === 0 ? (
				<p className='text-center text-gray-500'>No albums 🤧</p>
			) : (
				albums.map(album => (
					<CardAlbum
						key={album.id}
						album={album}
						isSelected={idsSelected.includes(album.id)}
						addIdSelected={addIdSelected}
						removeIdSelected={removeIdSelected}
					/>
				))
			)}
		</div>
	);
}