import { useContext, useState } from 'react';

import useAlbums from '../hooks/useAlbums';
import PlusIcon from './icons/PlusIcon';
import AlbumList from './AlbumList';
import CreateAlbumModal from './CreateAlbumModal';
import { UserContext } from '../context/userContext';

export default function Albums(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { albums } = useAlbums();
	const [openModal, setOpenModal] = useState(false);

	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between border-b-2 p-4 pb-4'>
				<h2 className='text-2xl font-bold'>Albums</h2>

				{currentUser !== null && (
					<button
						onClick={(): void => {
							setOpenModal(true);
						}}
						className='flex items-center justify-center gap-1 text-sm text-blue-500'
					>
						<PlusIcon width={16} height={16} />

						<span>Create Album</span>
					</button>
				)}
			</header>

			<div>
				<AlbumList albums={albums} />
			</div>

			<CreateAlbumModal openModal={openModal} setOpenModal={setOpenModal} />
		</section>
	);
}
