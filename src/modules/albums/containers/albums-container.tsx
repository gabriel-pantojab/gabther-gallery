import { useContext, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { AlbumListHeader } from '../components/album-list-header/album-list-header';
import { AlbumListContainer } from './album-list-container';
import { CreateAlbumModal } from '../components/create-album-modal/create-album-modal';

export function AlbumsContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const [openModal, setOpenModal] = useState<boolean>(false);

	return (
		<section className='w-full'>
			<AlbumListHeader
				isLoggedIn={!!currentUser}
				openModal={() => setOpenModal(true)}
			/>

			<AlbumListContainer />

			{openModal && <CreateAlbumModal close={() => setOpenModal(false)} />}
		</section>
	);
}
