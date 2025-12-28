import PlusIcon from '@/components/icons/PlusIcon';

type Props = {
	isLoggedIn: boolean;
	openModal: () => void;
};

export function AlbumListHeader({ isLoggedIn, openModal }: Props): JSX.Element {
	return (
		<header className='flex w-full items-center justify-between border-b-2 p-4 pb-4'>
			<h2 className='text-2xl font-bold'>Albums</h2>

			{isLoggedIn && (
				<button
					onClick={openModal}
					className='flex items-center justify-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
				>
					<PlusIcon width={16} height={16} />

					<span>Create Album</span>
				</button>
			)}
		</header>
	);
}
