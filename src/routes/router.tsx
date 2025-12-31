import { lazy, Suspense } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/layout/app-layout';
import { mediaRoutes } from '@/modules/media/routes';
import { albumRoutes } from '@/modules/albums/routes';
import useAuthGuard from '../guards/auth.guard';
import ProtectedRoute from '../components/ProtectedRoute';
import { SpecialNotes } from '../pages/special-notes';
import { SPECIAL_NOTES } from '../shared/constants/special-notes';

const SendLoveNotes = lazy(() => import('../pages/SendLoveNotes'));
const SendLoveNote = lazy(() => import('../components/SendLoveNote'));
const ReceivedLoveNotes = lazy(() => import('../pages/ReceivedLoveNotes'));
const LoveNote = lazy(() => import('../pages/LoveNote'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ path: '/', element: <Navigate to='/gallery' replace /> },
			{
				path: '/gallery',
				children: [mediaRoutes],
			},
			{ path: '/albums', children: [albumRoutes] },
			// { path: '/favorites', element: <FavoriteListPage /> },
			// { path: '/album/:album', element: <AlbumPage /> },
			{
				path: 'secure',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/gallery'>
						<Outlet />
					</ProtectedRoute>
				),
				children: [
					{
						path: 'love-notes',
						children: [
							{
								path: '',
								element: <Navigate to='sends' replace />,
							},
							{
								path: 'sends',
								element: (
									<Suspense fallback={<h1>loading...</h1>}>
										<SendLoveNotes />
									</Suspense>
								),
							},
							{
								path: 'sends/send',
								element: (
									<Suspense fallback={<h1>loading...</h1>}>
										<SendLoveNote />
									</Suspense>
								),
							},
							{
								path: 'received',
								element: (
									<Suspense fallback={<h1>loading...</h1>}>
										<ReceivedLoveNotes />
									</Suspense>
								),
							},
							{
								path: 'received/:idLoveNote',
								element: (
									<Suspense fallback={<h1>loading...</h1>}>
										<LoveNote />
									</Suspense>
								),
							},
							{
								path: 'sends/:idLoveNote',
								element: (
									<Suspense fallback={<h1>loading...</h1>}>
										<LoveNote />
									</Suspense>
								),
							},
						],
					},
					{
						path: 'special-notes',
						element: <SpecialNotes />,
					},
					...SPECIAL_NOTES.map(specialNote => {
						return {
							path: `special-notes/${specialNote.specialRoute}`,
							element: specialNote.element,
						};
					}),
				],
			},
		],
		errorElement: <div>404</div>,
	},
]);
