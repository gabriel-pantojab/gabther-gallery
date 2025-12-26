import UploadPhoto from '@/components/UploadPhoto';

type Props = {
	isLoggedIn: boolean;
};

export function GalleryHeader({ isLoggedIn }: Props): JSX.Element {
	return (
		<header className='flex w-full items-center justify-between p-4 pb-4'>
			<h2 className='text-2xl font-bold'>Gallery</h2>

			{isLoggedIn && <UploadPhoto />}
		</header>
	);
}
