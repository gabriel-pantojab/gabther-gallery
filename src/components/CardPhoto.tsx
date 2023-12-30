import { useState } from 'react';
import { Link } from 'react-router-dom';

import { type PhotoDB } from '../models/photo.interface';
import CheckIcon from './icons/CheckIcon';

interface CardPhotoProps {
	photo: PhotoDB;
	addIdSelected?: (id: number) => void;
	removeIdSelected?: (id: number) => void;
}

export default function CardPhoto({
	photo,
	addIdSelected,
	removeIdSelected,
}: CardPhotoProps): JSX.Element {
	const [isHover, setIsHover] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div
			style={{
				animationTimeline: 'view()',
				animationRange: 'entry 20% cover 30%',
			}}
			className='relative animate-reveal transition duration-300 ease-in-out'
			onMouseEnter={() => {
				setIsHover(true);
			}}
			onMouseLeave={() => {
				setIsHover(false);
			}}
		>
			<div
				className={`absolute top-0 z-50 cursor-pointer p-1 text-gray-300 transition duration-300 ease-in-out
					${isHover || isSelected ? 'opacity-100' : 'opacity-0'}
					${isSelected && 'w-ful bottom-0 left-0 right-0 h-full text-blue-500'}
					${!isSelected && 'hover:text-white'}
				`}
				onClick={() => {
					setIsSelected(prev => !prev);
					if (isSelected) {
						removeIdSelected !== undefined && removeIdSelected(photo.id);
					} else {
						addIdSelected !== undefined && addIdSelected(photo.id);
					}
				}}
			>
				<CheckIcon />
			</div>

			<Link
				to={`/photos/photo/${photo.id}`}
				className={`${isSelected && 'bg-blue-100'} block h-full w-full`}
			>
				<div
					className={`${
						isSelected && 'scale-75'
					} h-full w-full overflow-hidden rounded-md bg-gray-200 transition duration-300 ease-in-out`}
				>
					<img
						className='w-full bg-cover'
						src={photo.url_image}
						alt={photo.name}
						width={100}
						height={100}
					/>
				</div>
			</Link>
		</div>
	);
}
