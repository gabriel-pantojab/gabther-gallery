import { Link } from 'react-router-dom';

import { type AlbumDB } from '../../models/album.interface';
import CameraIcon from '../icons/CameraIcon';
import { UserContext } from '../../context/userContext';
import { useContext, useState } from 'react';
import CheckIcon from '../icons/CheckIcon';

interface CardAlbumProps {
	album: AlbumDB;
	isSelected: boolean;
	addIdSelected?: (id: number) => void;
	removeIdSelected?: (id: number) => void;
}

export default function CardAlbum({
	album,
	isSelected,
	addIdSelected,
	removeIdSelected,
}: CardAlbumProps): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className='relative flex h-full w-full animate-reveal transition duration-300 ease-in-out'
			onMouseEnter={() => {
				if (currentUser === null) return;
				setIsHover(true);
			}}
			onMouseLeave={() => {
				if (currentUser === null) return;
				setIsHover(false);
			}}
		>
			<div
				className={`absolute top-0 z-50 cursor-pointer p-1 text-gray-300 transition duration-300 ease-in-out
					${isHover || isSelected ? 'opacity-100' : 'opacity-0'}
					${isSelected && 'bottom-0 left-0 right-0 h-full w-full text-blue-500'}
					${!isSelected && 'hover:text-blue-500'}
					
				`}
				onClick={() => {
					if (currentUser === null) return;
					if (isSelected) {
						removeIdSelected !== undefined && removeIdSelected(album.id);
					} else {
						addIdSelected !== undefined && addIdSelected(album.id);
					}
				}}
			>
				<CheckIcon
					className={`${isSelected && 'text-blue-500'} ${
						isSelected && 'hover:text-gray-300'
					}`}
				/>
			</div>

			<Link
				to={`/albums/album/${album.name}-${album.id}`}
				className={`${isSelected && 'bg-blue-100'} block h-full w-full`}
			>
				<article
					key={album.id}
					className={`flex h-full w-full flex-col gap-2 ${
						isSelected && 'scale-75'
					}`}
				>
					<figure className='relative flex h-full max-h-[200px] w-full cursor-pointer flex-col rounded-md border-2 bg-white before:absolute before:-top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-md before:bg-gray-300 before:content-["*"]'>
						{album.url_album_cover === '' ? (
							<div className='flex h-full w-full items-center justify-center'>
								<span>
									<CameraIcon width={40} height={40} color={'#CDB0EE'} />
								</span>
							</div>
						) : (
							<img
								src={album.url_album_cover}
								alt={album.name}
								className='h-full w-full'
							/>
						)}
					</figure>

					<h3 className='flex items-center justify-center rounded-md bg-[#CDB0EE] bg-opacity-70 p-2 font-bold text-white'>
						{album.name}
					</h3>
				</article>
			</Link>
		</div>
	);
}
