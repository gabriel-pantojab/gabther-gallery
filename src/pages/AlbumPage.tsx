import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import BackIcon from '../components/icons/BackIcon';
import PhotoPlusIcon from '../components/icons/PhotoPlusIcon';
import PhotoList from '../components/PhotoList';
import useFilesAlbum from '../hooks/useFilesAlbum';
import SelectPhoto from '../components/SelectPhoto';
import { UserContext } from '../context/userContext';
import CardAlbum from '../components/albums/CardAlbum';
import CreateAlbumModal from '../components/CreateAlbumModal';
import PlusIcon from '../components/icons/PlusIcon';
import SelectedOptions from '../components/SelectedOptions';
import TrashIcon from '../components/icons/TrashIcon';
import { SupabaseContext } from '../context/supabaseContext';
import { deletePhotoFromAlbum } from '../utils/supabase';

export default function AlbumPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { supabase } = useContext(SupabaseContext);
	const { album } = useParams();
	const navigation = useNavigate();
	const name = album?.split('-')[0];
	const id = Number(album?.split('-')[1]);
	const { photos, subAlbums } = useFilesAlbum({ idAlbum: id });

	const [openSelectPhoto, setOpenSelectPhoto] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [idsSelected, setIdsSelected] = useState<number[]>([]);

	const addIdSelected = (id: number): void => {
		setIdsSelected([...idsSelected, id]);
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(idsSelected.filter(idSelected => idSelected !== id));
	};

	const deleteSelectedPhotos = (): void => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'They will be deleted from the album.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		})
			.then(result => {
				if (result.isConfirmed) {
					const promises = idsSelected.map(async idPhoto => {
						await deletePhotoFromAlbum({ idPhoto, idAlbum: id, supabase });
					});
					const idToast = toast.loading('Deleting photos');
					Promise.all(promises)
						.then(() => {
							setIdsSelected([]);
							toast.update(idToast, {
								render: 'Deleted',
								type: 'success',
								isLoading: false,
								autoClose: 1000,
							});
						})
						.catch(error => {
							toast.update(idToast, {
								render: error.message,
								type: 'error',
								isLoading: false,
								autoClose: 1000,
							});
						});
				}
			})
			.catch(error => {
				console.error(error);
			});
	};

	return (
		<section className='h-full w-full'>
			<header className='flex w-full border-b-2 p-4 pt-2'>
				<h2 className='w-full text-xl font-bold'>{name}</h2>

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

			<div className='w-full'>
				<SelectedOptions idsSelected={idsSelected} className='border-t-0'>
					<button
						onClick={deleteSelectedPhotos}
						className='flex cursor-pointer items-center gap-1 p-1 text-sm text-red-500 hover:bg-gray-200'
					>
						<TrashIcon />
					</button>
				</SelectedOptions>

				{subAlbums !== null && (
					<div className='grid w-full grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4'>
						{subAlbums.map(album => {
							return (
								<CardAlbum
									key={album.id}
									album={album}
									addIdSelected={addIdSelected}
									removeIdSelected={removeIdSelected}
									isSelected={idsSelected.includes(album.id)}
								/>
							);
						})}
					</div>
				)}

				{photos?.length !== 0 && (
					<PhotoList
						photos={photos}
						idsSelected={idsSelected}
						addIdSelected={addIdSelected}
						removeIdSelected={removeIdSelected}
					/>
				)}
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
