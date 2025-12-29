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
	const [selectedAlbumIds, setSelectedAbumIds] = useState<Set<number>>(
		new Set(),
	);
	const [selectedMediaIds, setSelectedMediaIds] = useState<Set<number>>(
		new Set(),
	);

	const total: number = selectedAlbumIds.size + selectedMediaIds.size;

	const handleAddId = (id: number, type: 'media' | 'album'): void => {
		if (type === 'media') {
			setSelectedMediaIds(prev => {
				const temp = structuredClone(prev);
				temp.add(id);
				return temp;
			});
			return;
		}
		setSelectedAbumIds(prev => {
			const temp = structuredClone(prev);
			temp.add(id);
			return temp;
		});
	};

	const handleRemoveId = (id: number, type: 'media' | 'album'): void => {
		if (type === 'media') {
			setSelectedMediaIds(prev => {
				const temp = structuredClone(prev);
				temp.delete(id);
				return temp;
			});
			return;
		}
		setSelectedAbumIds(prev => {
			const temp = structuredClone(prev);
			temp.delete(id);
			return temp;
		});
	};

	const handleAddMediaId = (id: number) => {
		handleAddId(id, 'media');
	};

	const handleAddAlbumId = (id: number) => {
		handleAddId(id, 'album');
	};

	const handleRemoveMediaId = (id: number) => {
		handleRemoveId(id, 'media');
	};

	const handleRemoveAlbumId = (id: number) => {
		handleRemoveId(id, 'album');
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
						selectedIds={selectedAlbumIds}
						eventAddId={handleAddAlbumId}
						eventRemoveId={handleRemoveAlbumId}
					/>
				)}

				{!!media?.length && (
					<MediaList
						isLoggedIn={isLoggedIn}
						media={media}
						selectedIds={selectedMediaIds}
						eventAddId={handleAddMediaId}
						eventRemoveId={handleRemoveMediaId}
					/>
				)}
			</section>
		</>
	);
}
