import { type AlbumDB } from '../models/album.interface';

interface CardAlbumProps {
	album: AlbumDB;
}

export default function CardAlbum({ album }: CardAlbumProps): JSX.Element {
	return (
		<article
			key={album.id}
			className='flex flex-col rounded-md border-2'
			style={{
				backgroundImage: `url(${album.url_album_cover})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<h3 className='flex items-center justify-center rounded-md rounded-b-none bg-[#CDB0EE] bg-opacity-70 p-2 font-bold text-white'>
				{album.name}
			</h3>
		</article>
	);
}
