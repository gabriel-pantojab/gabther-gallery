import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from './icons/BackIcon';
import PhotoPlusIcon from './icons/PhotoPlusIcon';
import PhotoList from './PhotoList';
import usePhotosAlbum from '../hooks/usePhotosAlbum';
import SelectPhoto from './SelectPhoto';
import { UserContext } from '../context/userContext';

export default function AlbumPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { album } = useParams();
	const navigation = useNavigate();
	const name = album?.split('-')[0];
	const id = Number(album?.split('-')[1]);
	const { photos } = usePhotosAlbum({ idAlbum: id });

	const [openSelectPhoto, setOpenSelectPhoto] = useState(false);

	return (
		<section className='h-full w-full'>
			<header className='flex w-full border-b-2 p-4 pt-2'>
				<h2 className='text-xl font-bold'>{name}</h2>

				<div className='flex w-full justify-end gap-2'>
					{currentUser !== null && (
						<button
							onClick={() => {
								setOpenSelectPhoto(true);
							}}
							className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
						>
							<PhotoPlusIcon />
						</button>
					)}

					<button
						onClick={() => {
							navigation(-1);
						}}
						className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
					>
						<BackIcon />
					</button>
				</div>
			</header>

			<div>{photos !== null && <PhotoList photos={photos} />}</div>

			{openSelectPhoto && (
				<SelectPhoto idAlbum={id} setOpen={setOpenSelectPhoto} />
			)}
		</section>
	);
}
