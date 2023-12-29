import { useRef } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import SideBarItem from './SideBarItem';
import PhotoIcon from './icons/PhotoIcon';
import AlbumIcon from './icons/AlbumIcon';
import FavoriteIcon from './icons/FavoriteIcon';

interface SideBarProps {
	open: boolean;
	close: () => void;
}

export default function SideBar({ open, close }: SideBarProps): JSX.Element {
	const myRefElement1 = useRef(null);
	const handleClickOutsideFn = (): void => {
		if (open) {
			close();
		}
	};

	useOnClickOutside(myRefElement1, handleClickOutsideFn);

	return (
		<aside
			ref={myRefElement1}
			className={`${
				!open ? '-translate-x-full' : 'translate-x-0'
			} fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 lg:sticky lg:translate-x-0`}
		>
			<div className='h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800'>
				<ul className='flex w-full flex-col gap-4'>
					<SideBarItem path='/photos' close={close}>
						<PhotoIcon />

						<span>Photos</span>
					</SideBarItem>

					<SideBarItem close={close} path='/albums'>
						<AlbumIcon />

						<span>Albums</span>
					</SideBarItem>

					<SideBarItem close={close} path='/favorites'>
						<FavoriteIcon />

						<span>Favorites</span>
					</SideBarItem>
				</ul>
			</div>
		</aside>
	);
}
