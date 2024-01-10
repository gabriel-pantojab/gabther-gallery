import { useContext } from 'react';

import { UserContext } from '../context/userContext';
import usePhotos from '../hooks/usePhotos';

import PhotoList from '../components/PhotoList';
import PhotoListHeader from '../components/PhotoListHeader';
import UploadPhotoDD from '../components/UploadPhotoDD';

export default function PhotoListPage(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { photos } = usePhotos();

	return (
		<section className='w-full'>
			<PhotoListHeader />

			<UploadPhotoDD enableUpload={currentUser !== null}>
				<PhotoList photos={photos} />
			</UploadPhotoDD>
		</section>
	);
}
