import { useContext, useState } from 'react';

import { UserContext } from '../context/userContext';
import usePhotos from '../hooks/usePhotos';

import PhotoList from '../components/PhotoList';
import PhotoListHeader from '../components/PhotoListHeader';
import UploadPhotoDD from '../components/UploadPhotoDD';
import SelectedOptions from '../components/SelectedOptions';
import TrashIcon from '../components/icons/TrashIcon';

export default function PhotoListPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { photos } = usePhotos();

	const [idsSelected, setIdsSelected] = useState<number[]>([]);

	const addIdSelected = (id: number): void => {
		setIdsSelected([...idsSelected, id]);
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(idsSelected.filter(idSelected => idSelected !== id));
	};

	return (
		<section className='w-full'>
			<PhotoListHeader />

			{
				<SelectedOptions idsSelected={idsSelected}>
					<TrashIcon />
				</SelectedOptions>
			}

			<UploadPhotoDD enableUpload={currentUser !== null}>
				<PhotoList
					photos={photos}
					idsSelected={idsSelected}
					addIdSelected={addIdSelected}
					removeIdSelected={removeIdSelected}
				/>
			</UploadPhotoDD>
		</section>
	);
}
