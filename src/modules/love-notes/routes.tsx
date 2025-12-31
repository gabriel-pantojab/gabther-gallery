import { lazy, Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const SentLoveNotesPage = lazy(() => import('./pages/sent-love-notes-page'));
const ReceivedLoveNotesPage = lazy(
	() => import('./pages/received-love-notes-page'),
);

export const sentLoveNotesRoutes: RouteObject = {
	element: (
		<Suspense fallback={<div className='p-4'>Loading...</div>}>
			<Outlet />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <Navigate to='sent' replace />,
		},
		{
			path: 'sent',
			element: <SentLoveNotesPage />,
		},
		{
			path: 'received',
			element: <ReceivedLoveNotesPage />,
		},
	],
};
