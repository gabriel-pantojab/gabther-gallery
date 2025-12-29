import { GoBack } from '@/shared/components/go-back/go-back';
import PhotoPlusIcon from '@/components/icons/PhotoPlusIcon';
import PlusIcon from '@/components/icons/PlusIcon';

type Props = {
	albumName: string;
	isLoggedIn: boolean;
	openCreateModal: () => void;
	openMediaSelector: () => void;
};

export function AlbumViewerHeader({
	albumName,
	isLoggedIn,
	openCreateModal,
	openMediaSelector,
}: Props): JSX.Element {
	return (
		<header className='flex w-full border-b-2 p-4 pt-2'>
			<h2 className='w-full text-xl font-bold'>{albumName}</h2>

			<div className='flex w-full justify-end gap-2'>
				{isLoggedIn && (
					// TODO: extract in a shared component
					<button
						onClick={openCreateModal}
						className='flex items-center justify-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
					>
						<PlusIcon width={16} height={16} />

						<span>Create Album</span>
					</button>
				)}

				{isLoggedIn && (
					<button
						onClick={openMediaSelector}
						className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
					>
						<PhotoPlusIcon />
					</button>
				)}

				<GoBack />
			</div>
		</header>
	);
}
