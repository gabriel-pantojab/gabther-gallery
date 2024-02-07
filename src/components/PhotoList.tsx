import Skeleton from 'react-loading-skeleton';

import { type PhotoDB } from '../models/photo.interface';
import CardPhoto from './CardPhoto';

interface PhotoListProps {
	photos: PhotoDB[] | null;
	idsSelected: number[];
	addIdSelected: (id: number) => void;
	removeIdSelected: (id: number) => void;
}

export default function PhotoList({
	photos,
	idsSelected,
	addIdSelected,
	removeIdSelected,
}: PhotoListProps): JSX.Element {
	return (
		<div className='relative flex w-full flex-col gap-2'>
			<div
				className={`relative grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`}
			>
				{photos === null ? (
					new Array(12).fill(0).map((_, index) => {
						return <Skeleton key={index} height={200} />;
					})
				) : photos.length === 0 ? (
					<p className='text-center text-gray-500'>No Photos 🤧</p>
				) : (
					photos.map(photo => {
						return (
							<CardPhoto
								isSelected={idsSelected.includes(photo.id)}
								key={photo.id}
								photo={photo}
								addIdSelected={addIdSelected}
								removeIdSelected={removeIdSelected}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}
