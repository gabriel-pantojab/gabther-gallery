import { type AlbumDB } from '../models/album.interface';
import CardAlbum from './CardAlbum';

interface AlbumListProps {
	albums: AlbumDB[];
}

export default function AlbumList({ albums }: AlbumListProps): JSX.Element {
	return (
		<div className='grid h-full min-h-screen w-full grid-flow-dense auto-rows-[minmax(200px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4'>
			{albums.map(album => (
				<CardAlbum key={album.id} album={album} />
			))}
		</div>
	);
}
