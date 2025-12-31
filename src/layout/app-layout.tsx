import { Outlet } from 'react-router-dom';
import { AppLayoutProvider } from './context/app-layout.context';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';

import style from './app-layout.module.css';

export function AppLayout(): JSX.Element {
	return (
		<AppLayoutProvider>
			<div className={style.layout}>
				<Header />

				<div className={style.container}>
					<Sidebar />

					<main className={style.content}>
						<Outlet />
					</main>
				</div>
			</div>
		</AppLayoutProvider>
	);
}
