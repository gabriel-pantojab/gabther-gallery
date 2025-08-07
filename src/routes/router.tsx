import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PhotoPage from '../pages/PhotoPage';
import AlbumPage from '../pages/AlbumPage';
import SendLoveNotes from '../pages/SendLoveNotes';
import SendLoveNote from '../components/SendLoveNote';
import ReceivedLoveNotes from '../pages/ReceivedLoveNotes';
import LoveNote from '../pages/LoveNote';
import ProtectedRoute from '../components/ProtectedRoute';
import useAuthGuard from '../guards/auth.guard';
import PhotoListPage from '../pages/PhotoListPage';
import AlbumListPage from '../pages/AlbumListPage';
import FavoriteListPage from '../pages/FavoriteListPage';
import { SpecialNotes } from '../pages/special-notes';
import { SPECIAL_NOTES } from '../shared/constants/special-notes';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Navigate to='/photos' replace />,
			},
			{
				path: '/photos',
				element: <PhotoListPage />,
			},
			{
				path: '/albums',
				element: <AlbumListPage />,
			},
			{
				path: '/favorites',
				element: <FavoriteListPage />,
			},
			{
				path: '/photos/photo/:photoId',
				element: <PhotoPage />,
			},
			{
				path: '/albums/album/:album',
				element: <AlbumPage />,
			},
			{
				path: '/love-notes/sends',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<SendLoveNotes />
					</ProtectedRoute>
				),
			},
			{
				path: '/love-notes/sends/send',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<SendLoveNote />
					</ProtectedRoute>
				),
			},
			{
				path: '/love-notes/received',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<ReceivedLoveNotes />
					</ProtectedRoute>
				),
			},
			{
				path: '/love-notes/received/:idLoveNote',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<LoveNote />
					</ProtectedRoute>
				),
			},
			{
				path: '/love-notes/sends/:idLoveNote',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<LoveNote />
					</ProtectedRoute>
				),
			},
			{
				path: '/special-notes',
				element: (
					<ProtectedRoute guard={useAuthGuard} redirect='/photos'>
						<SpecialNotes />
					</ProtectedRoute>
				),
			},
			...SPECIAL_NOTES.map(specialNote => ({
				path: specialNote.specialRoute,
				element: specialNote.element,
			})),
		],
		errorElement: <div>404</div>,
	},
]);
