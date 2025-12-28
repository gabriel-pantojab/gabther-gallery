import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import AlbumPage from '../pages/AlbumPage';
import ProtectedRoute from '../components/ProtectedRoute';
import useAuthGuard from '../guards/auth.guard';
import FavoriteListPage from '../pages/FavoriteListPage';
import { SpecialNotes } from '../pages/special-notes';
import { SPECIAL_NOTES } from '../shared/constants/special-notes';
import { mediaRoutes } from '@/modules/media/routes';
import { lazy, Suspense } from 'react';
import { albumRoutes } from '@/modules/albums/routes';

const SendLoveNotes = lazy(() => import('../pages/SendLoveNotes'));
const SendLoveNote = lazy(() => import('../components/SendLoveNote'));
const ReceivedLoveNotes = lazy(() => import('../pages/ReceivedLoveNotes'));
const LoveNote = lazy(() => import('../pages/LoveNote'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/', element: <Navigate to='/gallery' replace /> },
			{
				path: '/gallery',
				children: [mediaRoutes],
			},
			{ path: '/albums', children: [albumRoutes] },
			{ path: '/favorites', element: <FavoriteListPage /> },
			// { path: '/albums/album/:album', element: <AlbumPage /> },
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
