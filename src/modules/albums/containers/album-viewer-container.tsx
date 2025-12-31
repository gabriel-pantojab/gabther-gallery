import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from '@/context/userContext';
import { AlbumViewer } from '../components/album-viewer/album-viewer';
import { useMediaAlbum } from '../hooks/use-media-album';
import { CreateAlbumModal } from '../components/create-album-modal/create-album-modal';
import { useAlbumDetails } from '../hooks/use-album-details';
import { MediaSelectorContainer } from './media-selector-container';

type Params = {
	albumId: number;
};

export function AlbumViewerContainer(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openMediaSelector, setOpenMediaSelector] = useState<boolean>(false);
	const { albumId } = useLoaderData() as Params;
	const { album } = useAlbumDetails(albumId);
	const { media, subAlbums } = useMediaAlbum(albumId);

	return (
		<section className='relative'>
			<AlbumViewer
				isLoggedIn={!!currentUser}
				albumName={album?.name ?? ''}
				media={media}
				subAlbums={subAlbums}
				openCreateAlbum={() => setOpenModal(true)}
				openMediaSelector={() => setOpenMediaSelector(true)}
			/>

			{openModal && (
				<CreateAlbumModal
					parentId={albumId}
					close={() => setOpenModal(false)}
				/>
			)}

			{openMediaSelector && (
				<MediaSelectorContainer
					albumId={albumId}
					close={() => setOpenMediaSelector(false)}
				/>
			)}
		</section>
	);
}
