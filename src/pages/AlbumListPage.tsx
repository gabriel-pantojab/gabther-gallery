import { useState } from 'react';

import useAlbums from '../hooks/useAlbums';
import AlbumList from '../components/AlbumList';
import CreateAlbumModal from '../components/CreateAlbumModal';
import AlbumListHeader from '../components/AlbumListHeader';

export default function AlbumListPage(): JSX.Element {
	const { albums } = useAlbums();
	const [openModal, setOpenModal] = useState(false);

	return (
		<section className='w-full'>
			<AlbumListHeader setOpenModal={setOpenModal} />

			<div>
				<AlbumList albums={albums} />
			</div>

			<CreateAlbumModal openModal={openModal} setOpenModal={setOpenModal} />
		</section>
	);
}
