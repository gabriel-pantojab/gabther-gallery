import { type FormEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import useAlbum from '../hooks/useAlbum';
import useAlbums from '../hooks/useAlbums';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import AlbumList from './AlbumList';

export default function Albums(): JSX.Element {
	const { albums } = useAlbums();
	const { createAlbum } = useAlbum();

	const [openModal, setOpenModal] = useState<boolean>(false);
	const [albumName, setAlbumName] = useState<string>('');
	const [albumCover, setAlbumCover] = useState<File | null>(null);
	const [urlAlbumCover, setUrlAlbumCover] = useState<string>('');

	const onDrop = (acceptedFiles: File[]): void => {
		const file = acceptedFiles[0];
		const url = window.URL.createObjectURL(file);
		setUrlAlbumCover(url);
		setAlbumCover(file);
	};
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleCreateAlbum = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		let idToast;
		try {
			if (albumName === '') throw new Error('Name is required');
			const name = albumName.trim();
			setOpenModal(false);
			idToast = toast.loading('Creating...');
			await createAlbum(name, albumCover);
			toast.update(idToast, {
				render: 'Created',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error: any) {
			if (idToast !== undefined) {
				toast.update(idToast, {
					render: 'Error, ' + error.message,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
				});
			} else {
				toast.error('Error, ' + error.message, {
					autoClose: 1000,
				});
			}
		}
	};

	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between border-b-2 p-4 pb-4'>
				<h2 className='text-2xl font-bold'>Albums</h2>

				<button
					onClick={(): void => {
						setOpenModal(true);
					}}
					className='flex items-center justify-center gap-1 text-sm text-blue-500'
				>
					<PlusIcon width={16} height={16} />

					<span>Create Album</span>
				</button>
			</header>

			<div>
				{albums !== null && albums.length > 0 ? (
					<AlbumList albums={albums} />
				) : albums === null ? (
					<div>loading...</div>
				) : (
					<div>no albums</div>
				)}
			</div>

			{openModal && (
				<div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-400 bg-opacity-50 px-4'>
					<form
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onSubmit={e => {
							// eslint-disable-next-line @typescript-eslint/no-floating-promises
							handleCreateAlbum(e);
						}}
						className='flex w-full max-w-[500px] flex-col gap-4 rounded-md bg-white p-4 md:gap-8 md:p-8'
					>
						<label htmlFor='albumName' className='flex w-full flex-col gap-2'>
							<span>Album Name</span>

							<input
								type='text'
								name='albumName'
								id='albumName'
								value={albumName}
								onChange={(e): void => {
									setAlbumName(e.target.value);
								}}
								className='w-full rounded-md border-2 border-blue-500 p-1 pl-2 focus:outline-none'
							/>
						</label>

						<div className='flex w-full flex-col gap-2'>
							<div className='flex'>
								<span className='w-full'>Album Cover</span>

								{albumCover !== null && (
									<div className='flex w-full justify-end p-1'>
										<button
											className='text-red-500'
											onClick={(): void => {
												setAlbumCover(null);
												setUrlAlbumCover('');
											}}
										>
											<TrashIcon width={18} height={18} />
										</button>
									</div>
								)}
							</div>

							<div
								{...getRootProps()}
								className='relative flex h-40 w-full flex-col items-center justify-center rounded-md border-2 border-blue-400'
							>
								<input {...getInputProps()} />
								{albumCover === null && !isDragActive && (
									<p className={`p-2 text-center text-gray-500`}>
										Drag and drop some files here, or click to select files
									</p>
								)}

								{isDragActive && (
									<div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-400 bg-opacity-50'>
										<p className='text-center text-white'>
											Release to drop the files here
										</p>
									</div>
								)}

								{albumCover !== null && (
									<figure className='h-full w-full overflow-hidden rounded-md rounded-t-none'>
										<img
											src={urlAlbumCover}
											className='h-full w-full object-cover'
											alt={albumCover?.name}
										/>
									</figure>
								)}
							</div>
						</div>

						<div className='flex w-full justify-center gap-8'>
							<button
								type='submit'
								className='w-full rounded-md bg-blue-500 p-2 text-white'
							>
								Create
							</button>

							<button
								type='button'
								onClick={(): void => {
									setOpenModal(false);
								}}
								className='w-full rounded-md bg-red-500 p-2 text-white'
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</section>
	);
}
