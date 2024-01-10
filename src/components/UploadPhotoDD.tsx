import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import useUploadPhoto from '../hooks/useUploadPhoto';
import UploadIcon from './icons/UploadIcon';

interface UploadPhotoDDProps {
	children: React.ReactNode;
	enableUpload: boolean;
}

export default function UploadPhotoDD({
	children,
	enableUpload,
}: UploadPhotoDDProps): JSX.Element {
	const { handleUploadPhotos, uploading } = useUploadPhoto();

	const onDrop = useCallback((acceptedFiles: File[]) => {
		handleUploadPhotos(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			{...getRootProps()}
			onClick={e => {
				e.stopPropagation();
			}}
			onFocus={e => {
				e.stopPropagation();
			}}
			className='relative flex'
		>
			{enableUpload !== null && <input {...getInputProps()} />}

			{enableUpload !== null && (
				<div
					className={`
    fixed
    left-0 top-0 z-[999] h-full w-full
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
			)}

			{uploading && (
				<div className='fixed bottom-0 left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-gray-200 bg-opacity-60'>
					<p className='flex flex-col items-center justify-center text-xl font-bold italic text-gray-600'>
						Uploading...
					</p>
				</div>
			)}

			{children}
		</div>
	);
}
