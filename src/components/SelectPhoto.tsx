import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import usePhotos from '../hooks/usePhotos';
import CardPhoto from './CardPhoto';
import { insertPhotoToAlbum } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';

interface TypeProps {
	setOpen: (value: boolean) => void;
	idAlbum: number;
}

export default function SelectPhoto({
	setOpen,
	idAlbum,
}: TypeProps): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const { photos } = usePhotos();
	const [idsSelected, setIdsSelected] = useState<number[]>([]);

	const addIdSelected = (id: number): void => {
		setIdsSelected(prev => {
			return [...prev, id];
		});
	};

	const removeIdSelected = (id: number): void => {
		setIdsSelected(prev => {
			return prev.filter(item => item !== id);
		});
	};

	const addPhotosToAlbum = async (): Promise<void> => {
		const idToast = toast.loading('Adding...');
		try {
			const promises = idsSelected.map(async (id): Promise<void> => {
				await insertPhotoToAlbum({ idAlbum, idPhoto: id, supabase });
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
		}
	};

	return (
		<div className='absolute left-0 top-0 z-[999999] flex min-h-screen w-full flex-col bg-white'>
			<header className='flex w-full justify-between border-b-2 p-4'>
				<h2>Select photo</h2>

				<button
					onClick={() => {
						setOpen(false);
					}}
				>
					Close
				</button>
			</header>

			{idsSelected.length > 0 && (
				<div className='sticky top-0 z-[9999] flex w-full justify-between bg-white p-4 shadow-2xl'>
					<p>X {idsSelected.length} selected</p>

					<button
						onClick={() => {
							void addPhotosToAlbum();
						}}
						className='rounded-md bg-blue-500 px-4 py-1 text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600'
					>
						Add to album
					</button>
				</div>
			)}

			<section
				className={`relative grid h-full min-h-screen w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`}
			>
				{photos
					?.filter(photo => photo.id_album !== idAlbum)
					.map(photo => (
						<CardPhoto
							isSelected={idsSelected.includes(photo.id)}
							navigate={false}
							addIdSelected={addIdSelected}
							removeIdSelected={removeIdSelected}
							key={photo.id}
							photo={photo}
						/>
					))}
			</section>
		</div>
	);
}
