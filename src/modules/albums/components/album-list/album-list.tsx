import Skeleton from 'react-loading-skeleton';
import { Album } from '@/core/types/domain/album.model';
import { AlbumCardWrapper } from '../album-card-wrapper/album-card-wrapper';

type Props = {
	isLoggedIn: boolean;
	albums: Album[] | null;
	selectedIds: Set<number>;
	eventSelectAlbum: (album: Album) => void;
};

export function AlbumList({
	isLoggedIn,
	albums,
	selectedIds,
	eventSelectAlbum,
}: Props): JSX.Element {
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
		eventSelectAlbum(album);
	};

	return (
		<section className={gridClass}>
			{albums.map(album => (
				<AlbumCardWrapper
					key={album.id}
					isLoggedIn={isLoggedIn}
					album={album}
					isSelected={selectedIds.has(album.id)}
					eventSelectAlbum={handleSelectAlbum}
				/>
			))}
		</section>
	);
}
