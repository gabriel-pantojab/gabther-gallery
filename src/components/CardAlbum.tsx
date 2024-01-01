import { Link } from 'react-router-dom';

import { type AlbumDB } from '../models/album.interface';

interface CardAlbumProps {
	album: AlbumDB;
}

export default function CardAlbum({ album }: CardAlbumProps): JSX.Element {
	return (
		<div className='flex h-full w-full'>
			<Link
				to={`/albums/album/${album.name}-${album.id}`}
				className='h-full w-full'
			>
				<article
					key={album.id}
					className='relative flex h-full w-full cursor-pointer flex-col rounded-md border-2 bg-white before:absolute before:-top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-md before:bg-gray-300 before:content-["*"]'
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
			</Link>
		</div>
	);
}
