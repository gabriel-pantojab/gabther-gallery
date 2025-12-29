import { UploadMedia } from '@/shared/components/upload-media/updoad-media';

type Props = {
	isLoggedIn: boolean;
	eventUploadMedia: (files: File[]) => void;
};

export function GalleryHeader({
	isLoggedIn,
	eventUploadMedia,
}: Props): JSX.Element {
	return (
		<header className='flex w-full items-center justify-between p-4 pb-4'>
			<h2 className='text-2xl font-bold'>Gallery</h2>

			{isLoggedIn && <UploadMedia eventUploadMedia={eventUploadMedia} />}
		</header>
	);
}
