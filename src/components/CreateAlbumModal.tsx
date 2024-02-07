import useCreateAlbum from '../hooks/useCreateAlbum';
import TrashIcon from './icons/TrashIcon';

interface CreateAlbumModalProps {
	openModal: boolean;
	setOpenModal: (value: boolean) => void;
	parentId?: number;
}

export default function CreateAlbumModal({
	openModal,
	setOpenModal,
	parentId,
}: CreateAlbumModalProps): JSX.Element {
	const {
		albumName,
		albumCover,
		getRootProps,
		getInputProps,
		isDragActive,
		urlAlbumCover,
		setAlbumName,
		setAlbumCover,
		setUrlAlbumCover,
		handleCreateAlbum,
	} = useCreateAlbum({ setOpenModal, parentId });

	if (!openModal) return <></>;
	return (
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
						autoFocus
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
	);
}
