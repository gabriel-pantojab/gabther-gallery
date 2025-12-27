import { Outlet, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const GalleryPage = lazy(() => import('./pages/gallery-page'));
const MediaViewerPage = lazy(() => import('./pages/media-viewer-page'));

export const mediaRoutes: RouteObject = {
	element: (
		<Suspense fallback={<div className='p-4'>Loading...</div>}>
			<Outlet />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <GalleryPage />,
		},
		{
			path: 'media/:photoId',
			element: <MediaViewerPage />,
		},
	],
};
