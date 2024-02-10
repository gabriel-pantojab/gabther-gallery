import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { insertPhotoToAlbum } from '../services/album-services';

import { UserContext } from '../context/userContext';
import usePhotos from '../hooks/usePhotos';
import PhotoList from '../components/PhotoList';
import PhotoListHeader from '../components/PhotoListHeader';
import UploadPhotoDD from '../components/UploadPhotoDD';
import SelectedOptions from '../components/SelectedOptions';
import TrashIcon from '../components/icons/TrashIcon';
import PlusIcon from '../components/icons/PlusIcon';
import SelectAlbum from '../components/SelectAlbum';

export default function PhotoListPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { photos } = usePhotos();

	const [idsSelected, setIdsSelected] = useState<number[]>([]);
	const [open, setOpen] = useState(false);
	const [idAlbumSelected, setIdAlbumSelected] = useState<number | null>(null);

	const addIdSelected = (id: number): void => {
		setIdsSelected([...idsSelected, id]);
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(idsSelected.filter(idSelected => idSelected !== id));
	};

	const addSelectPhotosToAlbum = async (): Promise<void> => {
		const idToast = toast.loading('Adding...');
		try {
			const promises = idsSelected.map(async id => {
				await insertPhotoToAlbum({
					idPhoto: id,
					idAlbum: idAlbumSelected,
				});
			});

			await Promise.all(promises);
			toast.update(idToast, {
				render: 'Added',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error: any) {
			let message = 'Unknown error';
			if (error.code === '23505') {
				message = 'Photo already added';
			}
			toast.update(idToast, {
				render: message,
				type: 'error',
				isLoading: false,
				autoClose: 2000,
			});
		} finally {
			setOpen(false);
			setIdsSelected([]);
			setIdAlbumSelected(null);
		}
	};

	return (
		<section className='relative w-full'>
			<PhotoListHeader />

			<SelectedOptions idsSelected={idsSelected}>
				<button
					onClick={() => {
						setOpen(true);
					}}
					className='flex cursor-pointer items-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
				>
					<PlusIcon />
				</button>

				<button className='flex cursor-pointer items-center gap-1 p-1 text-sm text-red-500 hover:bg-gray-200'>
					<TrashIcon />
				</button>
			</SelectedOptions>

			<UploadPhotoDD enableUpload={currentUser !== null}>
				<PhotoList
					photos={photos}
					idsSelected={idsSelected}
					addIdSelected={addIdSelected}
					removeIdSelected={removeIdSelected}
				/>
			</UploadPhotoDD>

			{open && (
				<SelectAlbum
					setAlbumSelected={setIdAlbumSelected}
					setOpen={setOpen}
					addSelectPhotosToAlbum={() => {
						void addSelectPhotosToAlbum();
					}}
				/>
			)}
		</section>
	);
}
