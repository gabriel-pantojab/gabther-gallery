import { useContext, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { AlbumListHeader } from '../components/album-list-header/album-list-header';
import { AlbumListContainer } from './album-list-container';

import CreateAlbumModal from '@/components/CreateAlbumModal';

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

			{openModal && (
				// TODO: add this component in albums modulo
				<CreateAlbumModal
					// TODO: se puede remover esta prop
					openModal={openModal}
					// TODO: change to closeModal
					setOpenModal={setOpenModal}
				/>
			)}
		</section>
	);
}
