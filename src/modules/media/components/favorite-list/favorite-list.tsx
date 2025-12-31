import Skeleton from 'react-loading-skeleton';
import { Photo } from '@/core/types/domain/photo.model';
import { FavoriteCard } from '../favorite-card/favorite-card';
import Swal from 'sweetalert2';

type Props = {
	isLoggedIn: boolean;
	media: Photo[] | null;
	eventRemoveFavorite: (id: number) => void;
};

export function FavoriteList({
	isLoggedIn,
	media,
	eventRemoveFavorite,
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

	const handleRemoveFavorite = (id: number) => {
		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then(async result => {
			if (result.isConfirmed) {
				eventRemoveFavorite(id);
			}
		});
	};

	return (
		<section className={gridClass}>
			{media.map(favorite => (
				<FavoriteCard
					key={favorite.id}
					isLoggedIn={isLoggedIn}
					media={favorite}
					eventRemoveFavorite={handleRemoveFavorite}
				/>
			))}
		</section>
	);
}
