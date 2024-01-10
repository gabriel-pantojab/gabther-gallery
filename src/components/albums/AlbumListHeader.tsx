import { useContext } from 'react';

import { UserContext } from '../../context/userContext';
import PlusIcon from '../icons/PlusIcon';

interface AlbumListHeaderProps {
	setOpenModal: (open: boolean) => void;
}

export default function AlbumListHeader({
	setOpenModal,
}: AlbumListHeaderProps): JSX.Element {
	const { currentUser } = useContext(UserContext);
	return (
		<header className='flex w-full items-center justify-between border-b-2 p-4 pb-4'>
			<h2 className='text-2xl font-bold'>Albums</h2>

			{currentUser !== null && (
				<button
					onClick={(): void => {
						setOpenModal(true);
					}}
					className='flex items-center justify-center gap-1 p-1 text-sm text-blue-500 hover:bg-gray-200'
				>
					<PlusIcon width={16} height={16} />

					<span>Create Album</span>
				</button>
			)}
		</header>
	);
}
