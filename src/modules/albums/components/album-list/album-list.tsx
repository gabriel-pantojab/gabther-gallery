import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Album } from '@/core/types/domain/album.model';
import { AlbumCardWrapper } from '../album-card-wrapper/album-card-wrapper';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';

type Props = {
	isLoggedIn: boolean;
	albums: Album[] | null;
};

export function AlbumList({ isLoggedIn, albums }: Props): JSX.Element {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
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

	const addSelectedId = (id: number): void => {
		setSelectedIds(prev => {
			const temp = structuredClone(prev);
			temp.add(id);
			return temp;
		});
	};

	const removeSelectedId = (id: number): void => {
		setSelectedIds(prev => {
			const temp = structuredClone(prev);
			temp.delete(id);
			return temp;
		});
	};

	return (
		<>
			<SelectionToolbar count={selectedIds.size}>
				<>{/* DUMMY */}</>
			</SelectionToolbar>

			<section className={gridClass}>
				{albums.map(album => (
					<AlbumCardWrapper
						key={album.id}
						isLoggedIn={isLoggedIn}
						album={album}
						isSelected={selectedIds.has(album.id)}
						addSelectedId={addSelectedId}
						removeSelectedId={removeSelectedId}
					/>
				))}
			</section>
		</>
	);
}
