import { useState } from 'react';
import { Album } from '@/core/types/domain/album.model';
import { Photo } from '@/core/types/domain/photo.model';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';
import { MediaList } from '@/modules/media/components/media-list/media-list';
import { AlbumViewerHeader } from '../album-viewer-header/album-viewer-header';
import { AlbumList } from '../album-list/album-list';

type Props = {
	isLoggedIn: boolean;
	albumName: string;
	subAlbums: Album[] | null;
	media: Photo[] | null;
	openCreateAlbum: () => void;
	openMediaSelector: () => void;
};

export function AlbumViewer({
	isLoggedIn,
	albumName,
	subAlbums,
	media,
	openCreateAlbum,
	openMediaSelector,
}: Props): JSX.Element {
	const [selectedAlbums, setSelectedAlbums] = useState<Map<number, Album>>(
		new Map(),
	);
	const [selectedMedia, setSelectedMedia] = useState<Map<number, Photo>>(
		new Map(),
	);

	const total: number = selectedAlbums.size + selectedMedia.size;

	const handleSelectMedia = (media: Photo) => {
		setSelectedMedia(prev => {
			const temp = new Map(prev);
			temp.has(media.id) ? temp.delete(media.id) : temp.set(media.id, media);
			return temp;
		});
	};

	const handleSelectAlbum = (album: Album) => {
		setSelectedAlbums(prev => {
			const temp = new Map(prev);
			temp.has(album.id) ? temp.delete(album.id) : temp.set(album.id, album);
			return temp;
		});
	};

	return (
		<>
			<AlbumViewerHeader
				isLoggedIn={isLoggedIn}
				albumName={albumName}
				openCreateModal={openCreateAlbum}
				openMediaSelector={openMediaSelector}
			/>

			<SelectionToolbar count={total}>
				<>{/*TODO: DUMMY */}</>
			</SelectionToolbar>

			<section className='w-full'>
				{!!subAlbums?.length && (
					<AlbumList
						isLoggedIn={isLoggedIn}
						albums={subAlbums}
						selectedIds={new Set([...selectedAlbums.keys()])}
						eventSelectAlbum={handleSelectAlbum}
					/>
				)}

				{!!media?.length && (
					<MediaList
						isLoggedIn={isLoggedIn}
						media={media}
						selectedIds={new Set([...selectedMedia.keys()])}
						eventSelectMedia={handleSelectMedia}
					/>
				)}
			</section>
		</>
	);
}
