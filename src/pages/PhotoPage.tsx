import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import usePhoto from '../hooks/usePhoto';
import StarIcon from '../components/icons/StarIcon';
import TrashIcon from '../components/icons/TrashIcon';
import DotsVerticalIcon from '../components/icons/DotsVertical';
import { dateFormat } from '../utils/utils';
import BackIcon from '../components/icons/BackIcon';
import { UserContext } from '../context/userContext';

export default function PhotoPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { photoId } = useParams();
	const navigation = useNavigate();
	const { photo, favorite, toggleFavorite, deletePhoto } = usePhoto({
		photoId: Number(photoId),
	});

	const handleDeletePhoto = (): void => {
		if (currentUser === null) return;
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this photo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		})
			.then(async result => {
				if (result.isConfirmed) {
					await deletePhoto();
					navigation(-1);
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
		<section className='flex w-full flex-col items-center gap-4 p-4'>
			<header className='flex w-full flex-col gap-4 md:flex-row md:justify-between'>
				<div className='flex gap-1'>
					<span
						onClick={() => {
							navigation(-1);
						}}
						className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
					>
						<BackIcon />
					</span>
				</div>

				<div className='flex justify-end gap-2 text-gray-600'>
					<span
						className='cursor-pointer text-[#B57EDC] transition duration-300 ease-in-out active:scale-95'
						onClick={
							currentUser !== null
								? () => {
										toggleFavorite();
									}
								: () => {}
						}
					>
						{favorite ? <StarIcon fill /> : <StarIcon />}
					</span>

					{currentUser !== null && (
						<>
							<span
								className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
								onClick={handleDeletePhoto}
							>
								<TrashIcon />
							</span>

							<span className='cursor-pointer transition duration-300 ease-in-out active:scale-95'>
								<DotsVerticalIcon />
							</span>
						</>
					)}
				</div>
			</header>

			<figure className='max-w-fit overflow-hidden rounded-md lg:max-h-screen'>
				{photo === null ? (
					<Skeleton height={500} width={500} />
				) : (
					<img
						className='aspect-auto h-full w-full'
						src={photo?.url_image}
						alt={photo?.name}
					/>
				)}
			</figure>

			<div className='flex w-full'>
				<p>
					Date: {photo?.created_at != null && dateFormat(photo?.created_at)}
				</p>
			</div>
		</section>
	);
}
