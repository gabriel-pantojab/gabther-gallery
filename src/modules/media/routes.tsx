import { RouteObject } from 'react-router-dom';
import GalleryPage from './pages/gallery-page';
import MediaViewerPage from './pages/media-viewer-page';

export const mediaRoutes: RouteObject[] = [
	{
		index: true,
		element: <GalleryPage />,
	},
	{
		path: 'media/:photoId',
		element: <MediaViewerPage />,
	},
];
