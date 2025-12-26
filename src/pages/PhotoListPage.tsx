import { useContext } from 'react';

import { UserContext } from '../context/userContext';
import PhotoListHeader from '../components/PhotoListHeader';
import UploadPhotoDD from '../components/UploadPhotoDD';
import { MediaGalleryContainer } from '@/modules/media/containers/media-gallery-container';

export default function PhotoListPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);

	return (
		<section className='relative w-full'>
			<PhotoListHeader />

			<UploadPhotoDD enableUpload={currentUser !== null}>
				<MediaGalleryContainer />
			</UploadPhotoDD>
		</section>
	);
}
