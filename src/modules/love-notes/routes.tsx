import { lazy, Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const SentLoveNotesPage = lazy(() => import('./pages/sent-love-notes-page'));

export const sentLoveNotesRoutes: RouteObject = {
	element: (
		<Suspense fallback={<div className='p-4'>Loading...</div>}>
			<Outlet />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <Navigate to='sents' replace />,
		},
		{
			path: 'sents',
			element: <SentLoveNotesPage />,
		},
	],
};
