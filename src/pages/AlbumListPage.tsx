import { useState } from 'react';

import useAlbums from '../hooks/useAlbums';
import AlbumList from '../components/albums/AlbumList';
import CreateAlbumModal from '../components/CreateAlbumModal';
import AlbumListHeader from '../components/albums/AlbumListHeader';
import SelectedOptions from '../components/SelectedOptions';
import TrashIcon from '../components/icons/TrashIcon';

export default function AlbumListPage(): JSX.Element {
	const { albums } = useAlbums();
	const [openModal, setOpenModal] = useState(false);

	const [idsSelected, setIdsSelected] = useState<number[]>([]);

	const addIdSelected = (id: number): void => {
		setIdsSelected([...idsSelected, id]);
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(idsSelected.filter(idSelected => idSelected !== id));
	};

	return (
		<section className='w-full'>
			<AlbumListHeader setOpenModal={setOpenModal} />

			{
				<SelectedOptions idsSelected={idsSelected} className='border-t-0'>
					<TrashIcon />
				</SelectedOptions>
			}

			<div>
				<AlbumList
					albums={albums}
					idsSelected={idsSelected}
					addIdSelected={addIdSelected}
					removeIdSelected={removeIdSelected}
				/>
			</div>

			<CreateAlbumModal openModal={openModal} setOpenModal={setOpenModal} />
		</section>
	);
}
