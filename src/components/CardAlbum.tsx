import { Link } from 'react-router-dom';

import { type AlbumDB } from '../models/album.interface';
import CameraIcon from './icons/CameraIcon';

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
				<article key={album.id} className='flex h-full w-full flex-col gap-2'>
					<figure className='relative flex h-full max-h-[200px] w-full cursor-pointer flex-col rounded-md border-2 bg-white before:absolute before:-top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-md before:bg-gray-300 before:content-["*"]'>
						{album.url_album_cover === '' ? (
							<div className='flex h-full w-full items-center justify-center'>
								<span>
									<CameraIcon width={40} height={40} color={'#CDB0EE'} />
								</span>
							</div>
						) : (
							<img
								src={album.url_album_cover}
								alt={album.name}
								className='h-full w-full'
							/>
						)}
					</figure>

					<h3 className='flex items-center justify-center rounded-md bg-[#CDB0EE] bg-opacity-70 p-2 font-bold text-white'>
						{album.name}
					</h3>
				</article>
			</Link>
		</div>
	);
}
