import { Navigate, createBrowserRouter } from 'react-router-dom';

import Photos from '../components/Photos';
import App from '../App';
import Videos from '../components/Videos';
import Albums from '../components/Albums';
import Favorites from '../components/Favorites';
import PhotoPage from '../components/PhotoPage';
import AlbumPage from '../components/AlbumPage';
import SendLoveNotes from '../components/SendLoveNotes';
import SendLoveNote from '../components/SendLoveNote';
import ReceivedLoveNotes from '../components/ReceivedLoveNotes';
import LoveNote from '../components/LoveNote';

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
				element: <Photos />,
			},
			{
				path: '/videos',
				element: <Videos />,
			},
			{
				path: '/albums',
				element: <Albums />,
			},
			{
				path: '/favorites',
				element: <Favorites />,
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
				element: <SendLoveNotes />,
			},
			{
				path: '/love-notes/sends/send',
				element: <SendLoveNote />,
			},
			{
				path: '/love-notes/received',
				element: <ReceivedLoveNotes />,
			},
			{
				path: '/love-notes/received/:idLoveNote',
				element: <LoveNote />,
			},
			{
				path: '/love-notes/sends/:idLoveNote',
				element: <LoveNote />,
			},
		],
		errorElement: <div>404</div>,
	},
]);
