import UploadIcon from '@/components/icons/UploadIcon';

type Props = {
	eventUploadMedia: (files: File[]) => void;
};

export function UploadMedia({ eventUploadMedia }: Props): JSX.Element {
	const handleUploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			eventUploadMedia(Array.from(e.target.files));
		}
	};

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
				onChange={handleUploadMedia}
			/>
		</label>
	);
}
