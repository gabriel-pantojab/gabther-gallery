import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import usePhotos from '../hooks/usePhotos';
import PhotoList from './PhotoList';
import useUploadFile from '../hooks/useUploadFile';

export default function Photos(): JSX.Element {
	const { photos } = usePhotos();

	const { uploadFiles, uploading } = useUploadFile();

	const handleUploadFiles = (files: File[]): void => {
		uploadFiles(files)
			.then(() => {
				console.log('files uploaded');
			})
			.catch(error => {
				console.log(error);
			});
	};

	const onDrop = useCallback((acceptedFiles: File[]) => {
		handleUploadFiles(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<section className='w-full p-4'>
			<header className='flex w-full items-center justify-between pb-4'>
				<h2 className='text-2xl font-bold'>Photos</h2>

				<label
					htmlFor='file'
					className='flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 px-2 text-gray-500 hover:bg-gray-200'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						strokeWidth='2'
						stroke='currentColor'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />

						<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1' />

						<path d='M9 15l3 -3l3 3' />

						<path d='M12 12l0 9' />
					</svg>

					<span>upload</span>

					<input
						type='file'
						name='file'
						id='file'
						className='hidden'
						onChange={e => {
							if (e.target.files !== null) {
								handleUploadFiles(Array.from(e.target.files));
							}
						}}
					/>
				</label>
			</header>

			<div
				{...getRootProps()}
				onClick={e => {
					e.stopPropagation();
				}}
				className={`relative grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4`}
			>
				<input {...getInputProps()} />

				<div
					className={`
					absolute
					left-0 top-0 z-[999] h-screen w-full
						${isDragActive ? 'flex' : 'hidden'}
						items-center
						justify-center bg-gray-200 bg-opacity-60
					`}
				>
					<p>Drop the files here ...</p>
				</div>

				{photos !== null ? (
					<PhotoList photos={photos} />
				) : photos === null ? (
					<div>loading...</div>
				) : (
					<div>no files</div>
				)}

				{uploading && (
					<div className='absolute left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-gray-200 bg-opacity-60'>
						<p>Uploading...</p>
					</div>
				)}
			</div>
		</section>
	);
}
