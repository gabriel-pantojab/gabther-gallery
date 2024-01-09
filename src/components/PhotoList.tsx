import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import { type PhotoDB } from '../models/photo.interface';
import CardPhoto from './CardPhoto';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';

interface PhotoListProps {
	photos: PhotoDB[] | null;
}

export default function PhotoList({ photos }: PhotoListProps): JSX.Element {
	const [idsSelected, setIdsSelected] = useState<number[]>([]);

	const addIdSelected = (id: number): void => {
		setIdsSelected(prev => [...prev, id]);
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(prev => prev.filter(item => item !== id));
	};

	const removeAllIdsSelected = (): void => {
		Swal.fire({
			title: 'Remove all selected photos?',
			text: 'You will not be able to recover this photo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		})
			.then(async result => {
				if (result.isConfirmed) {
					await Swal.fire(
						'Deleted!',
						'Mentira, aun no puedes eliminar fotos en esta sección :D',
						'success',
					);
					setIdsSelected([]);
				}
			})
			.catch((error: any) => {
				toast.error('Error, ' + error.message, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			});
	};

	return (
		<div className='relative flex w-full flex-col gap-2'>
			{idsSelected.length > 0 && (
				<div className='sticky top-0 z-50 flex w-full justify-between border-y-2 bg-white px-4 py-2'>
					<p>X {idsSelected.length} selected </p>

					<div className='flex gap-2 text-blue-500'>
						<span className='cursor-pointer transition duration-300 ease-in-out active:scale-90'>
							<PlusIcon />
						</span>

						<span
							onClick={removeAllIdsSelected}
							className='cursor-pointer transition duration-300 ease-in-out active:scale-90'
						>
							<TrashIcon />
						</span>
					</div>
				</div>
			)}

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
