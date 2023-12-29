import { useParams } from 'react-router-dom';

import usePhoto from '../hooks/usePhoto';
import StarIcon from './icons/StarIcon';
import TrashIcon from './icons/TrashIcon';
import DotsVerticalIcon from './icons/DotsVertical';
import { dateFormat } from '../utils/utils';

export default function PhotoPage(): JSX.Element {
	const { photoId } = useParams();
	const { photo, favorite, toggleFavorite } = usePhoto({
		photoId: Number(photoId),
	});

	return (
		<section className='flex w-full flex-col items-center gap-4 p-4'>
			<header className='flex w-full flex-col gap-4 lg:flex-row lg:justify-between'>
				<div className='flex flex-col gap-1'>
					<h2 className='font-bold'>{photo?.name}</h2>

					<p>
						Date: {photo?.created_at != null && dateFormat(photo?.created_at)}
					</p>
				</div>

				<div className='flex justify-end gap-2 text-gray-600'>
					<span
						className='cursor-pointer text-[#B57EDC] transition duration-300 ease-in-out active:scale-95'
						onClick={toggleFavorite}
					>
						{favorite ? <StarIcon fill /> : <StarIcon />}
					</span>

					<span className='cursor-pointer transition duration-300 ease-in-out active:scale-95'>
						<TrashIcon />
					</span>

					<span className='cursor-pointer transition duration-300 ease-in-out active:scale-95'>
						<DotsVerticalIcon />
					</span>
				</div>
			</header>

			<figure className='max-h-screen max-w-fit overflow-hidden rounded-md'>
				<img
					className='h-full w-full'
					src={photo?.url_image}
					alt={photo?.name}
				/>
			</figure>
		</section>
	);
}
