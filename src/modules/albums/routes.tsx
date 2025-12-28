import { lazy, Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const AlbumListPage = lazy(() => import('./pages/albums-page'));
const AlbumViewerPage = lazy(() => import('./pages/album-viewer-page'));

export const albumRoutes: RouteObject = {
	element: (
		<Suspense fallback={<div className='p-4'>Loading...</div>}>
			<Outlet />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <AlbumListPage />,
		},
		{
			path: 'album/:idAlbum',
			element: <AlbumViewerPage />,
		},
	],
};
