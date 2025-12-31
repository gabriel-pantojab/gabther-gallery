import { useSidebar } from '@/layout/hooks/use-sidebar';

import style from './header.module.css';

export function Header(): JSX.Element {
	const { openSidebar } = useSidebar();
	return (
		<header className={style.header}>
			<button className={style.openSidebar} onClick={openSidebar}>
				<svg
					aria-hidden='true'
					height={30}
					width={30}
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					></path>
				</svg>
			</button>

			<h1 className={style.title}>Gabther Gallery</h1>
		</header>
	);
}
