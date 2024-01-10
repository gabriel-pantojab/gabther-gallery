import useUploadPhoto from '../hooks/useUploadPhoto';
import UploadIcon from './icons/UploadIcon';

export default function UploadPhoto(): JSX.Element {
	const { handleUploadPhotos } = useUploadPhoto();
	return (
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
						handleUploadPhotos(Array.from(e.target.files));
					}
				}}
			/>
		</label>
	);
}
