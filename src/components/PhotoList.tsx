import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { type PhotoDB } from '../models/photo.interface';
import CardPhoto from './CardPhoto';
import TrashIcon from './icons/TrashIcon';
import PlusIcon from './icons/PlusIcon';

interface PhotoListProps {
	photos: PhotoDB[];
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
			.then(result => {
				if (result.isConfirmed) {
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
				className={`relative grid h-full min-h-screen w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`}
			>
				{photos.map(photo => {
					return (
						<CardPhoto
							key={photo.id}
							photo={photo}
							addIdSelected={addIdSelected}
							removeIdSelected={removeIdSelected}
						/>
					);
				})}
			</div>
		</div>
	);
}
