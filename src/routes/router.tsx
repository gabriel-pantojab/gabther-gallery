import { Navigate, createBrowserRouter } from 'react-router-dom';

import Photos from '../components/Photos';
import App from '../App';
import Videos from '../components/Videos';
import Albums from '../components/Albums';
import Favorites from '../components/Favorites';
import PhotoPage from '../components/PhotoPage';

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
		],
		errorElement: <div>404</div>,
	},
]);
