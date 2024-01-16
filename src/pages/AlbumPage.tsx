import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BackIcon from '../components/icons/BackIcon';
import PhotoPlusIcon from '../components/icons/PhotoPlusIcon';
import PhotoList from '../components/PhotoList';
import useFilesAlbum from '../hooks/useFilesAlbum';
import SelectPhoto from '../components/SelectPhoto';
import { UserContext } from '../context/userContext';
import CardAlbum from '../components/albums/CardAlbum';
import CreateAlbumModal from '../components/CreateAlbumModal';
import PlusIcon from '../components/icons/PlusIcon';

export default function AlbumPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { album } = useParams();
	const navigation = useNavigate();
	const name = album?.split('-')[0];
	const id = Number(album?.split('-')[1]);
	const { photos, subAlbums } = useFilesAlbum({ idAlbum: id });

	const [openSelectPhoto, setOpenSelectPhoto] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	return (
		<section className='h-full w-full'>
			<header className='flex w-full border-b-2 p-4 pt-2'>
				<h2 className='text-xl font-bold'>{name}</h2>

				<div className='flex w-full justify-end gap-2'>
					{currentUser !== null && (
						<button
							onClick={(): void => {
								setOpenModal(true);
							}}
							className='flex items-center justify-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
						>
							<PlusIcon width={16} height={16} />

							<span>Create Album</span>
						</button>
					)}

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

			<div>
				{subAlbums !== null && (
					<div className='grid w-full grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4'>
						{subAlbums.map(album => {
							return <CardAlbum key={album.id} album={album} />;
						})}
					</div>
				)}

				{photos !== null && <PhotoList photos={photos} />}
			</div>

			{openSelectPhoto && (
				<SelectPhoto idAlbum={id} setOpen={setOpenSelectPhoto} />
			)}

			<CreateAlbumModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				parentId={id}
			/>
		</section>
	);
}
