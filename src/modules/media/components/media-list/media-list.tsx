import Skeleton from 'react-loading-skeleton';
import { Photo } from '@/core/types/domain/photo.model';
import { MediaCardWrapper } from '../media-card-wrapper/media-card-wrapper';

type Props = {
	isLoggedIn: boolean;
	media: Photo[] | null;
	selectedIds: Set<number>;
	eventAddId: (id: number) => void;
	eventRemoveId: (id: number) => void;
};

export function MediaList({
	isLoggedIn,
	media,
	selectedIds,
	eventAddId,
	eventRemoveId,
}: Props): JSX.Element {
	const gridClass =
		'relative grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4';
	if (media === null) {
		return (
			<section className='relative flex w-full flex-col gap-2'>
				{new Array(12).fill(0).map((_, index) => {
					return <Skeleton key={index} height={200} />;
				})}
			</section>
		);
	}

	if (media.length === 0) {
		return (
			<section className='relative flex w-full flex-col gap-2'>
				<div className={gridClass}>
					<div className='col-span-full flex items-center justify-center py-12'>
						<p className='text-gray-500'>No Photos 🤧</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='relative flex w-full flex-col gap-2'>
			<div className={gridClass}>
				{media.map(photo => {
					return (
						<MediaCardWrapper
							key={photo.id}
							photo={photo}
							isLogged={isLoggedIn}
							isSelected={selectedIds.has(photo.id)}
							addSelectedId={eventAddId}
							removeSelectedId={eventRemoveId}
						/>
					);
				})}
			</div>
		</section>
	);
}
