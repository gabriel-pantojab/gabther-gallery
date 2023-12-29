import { useRef } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import SideBarItem from './SideBarItem';

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
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />

							<path d='M15 8h.01' />

							<path d='M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5' />

							<path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l1.5 1.5' />

							<path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
						</svg>

						<span>Photos</span>
					</SideBarItem>

					<SideBarItem close={close} path='/albums'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />

							<path d='M10.5 19h-5.5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2' />

							<path d='M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z' />
						</svg>

						<span>Albums</span>
					</SideBarItem>

					<SideBarItem close={close} path='/favorites'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							strokeWidth='2'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />

							<path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' />
						</svg>

						<span>Favorites</span>
					</SideBarItem>
				</ul>
			</div>
		</aside>
	);
}
