import { createBrowserRouter } from 'react-router-dom';

import Photos from '../components/Photos';
import App from '../App';
import Gallery from '../components/Gallery';
import Videos from '../components/Videos';
import Albums from '../components/Albums';
import Favorites from '../components/Favorites';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Gallery />,
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
		],
		errorElement: <div>404</div>,
	},
]);
