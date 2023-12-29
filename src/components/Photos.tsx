import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import usePhotos from '../hooks/usePhotos';
import PhotoList from './PhotoList';
import useUploadFile from '../hooks/useUploadFile';
import UploadIcon from './icons/UploadIcon';

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
					<UploadIcon />

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
					fixed
					left-0 top-0 z-[999] h-screen w-full
						${isDragActive ? 'flex' : 'hidden'}
						items-center
						justify-center bg-gray-200 bg-opacity-60
					`}
				>
					<p className='flex flex-col items-center justify-center text-xl font-bold italic text-gray-600'>
						<UploadIcon width={40} height={40} className='animate-pulsar' />
						Upload
					</p>
				</div>

				{photos !== null ? (
					<PhotoList photos={photos} />
				) : photos === null ? (
					<div>loading...</div>
				) : (
					<div>no files</div>
				)}

				{uploading && (
					<div className='fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-gray-200 bg-opacity-60'>
						<p className='flex flex-col items-center justify-center text-xl font-bold italic text-gray-600'>
							Uploading...
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
