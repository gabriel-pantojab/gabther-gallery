import { createContext, PropsWithChildren, useState } from 'react';

interface AppLayoutState {
	isOpenSidebar: boolean;
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
	isDesktop: () => boolean;
	isMobile: () => boolean;
}

export const AppLayoutContext = createContext<AppLayoutState>({
	isOpenSidebar: false,
	openSidebar: () => {},
	closeSidebar: () => {},
	toggleSidebar: () => {},
	isDesktop: () => false,
	isMobile: () => false,
});

export function AppLayoutProvider({ children }: PropsWithChildren) {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const openSidebar = () => setIsOpenSidebar(true);
	const closeSidebar = () => setIsOpenSidebar(false);
	const toggleSidebar = () => setIsOpenSidebar(prev => !prev);
	const isDesktop = () => window.innerWidth > 768;
	const isMobile = () => !isDesktop();

	return (
		<AppLayoutContext.Provider
			value={{
				isOpenSidebar,
				openSidebar,
				closeSidebar,
				toggleSidebar,
				isDesktop,
				isMobile,
			}}
		>
			{children}
		</AppLayoutContext.Provider>
	);
}
