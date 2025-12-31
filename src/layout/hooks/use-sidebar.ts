import { useContext, useEffect } from 'react';
import { AppLayoutContext } from '../context/app-layout.context';

export function useSidebar() {
	const { isOpenSidebar, openSidebar, closeSidebar, toggleSidebar, isMobile } =
		useContext(AppLayoutContext);

	useEffect(() => {
		const resizeHandle = () => {
			if (!isMobile()) {
				openSidebar();
			} else closeSidebar();
		};

		window.addEventListener('resize', resizeHandle);

		return () => {
			window.removeEventListener('resize', resizeHandle);
		};
	}, []);

	return { isOpenSidebar, openSidebar, closeSidebar, toggleSidebar, isMobile };
}
