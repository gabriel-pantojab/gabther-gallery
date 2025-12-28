import CameraIcon from '@/components/icons/CameraIcon';
import { Album } from '@/core/types/domain/album.model';

type Props = { album: Album };

export function AlbumCard({ album }: Props): JSX.Element {
	return (
		<article key={album.id} className={`flex h-full w-full flex-col gap-2`}>
			<figure className='relative flex h-full max-h-[200px] w-full cursor-pointer flex-col rounded-md border-2 bg-white before:absolute before:-top-1 before:left-1 before:-z-10 before:h-full before:w-full before:rounded-md before:bg-gray-300 before:content-["*"]'>
				{album.urlAlbumCover === '' ? (
					<div className='flex h-full w-full items-center justify-center'>
						<span>
							<CameraIcon width={40} height={40} color={'#CDB0EE'} />
						</span>
					</div>
				) : (
					<img
						src={album.urlAlbumCover}
						alt={album.name}
						className='h-full w-full'
					/>
				)}
			</figure>

			<h3 className='flex items-center justify-center rounded-md bg-[#CDB0EE] bg-opacity-70 p-2 font-bold text-white'>
				{album.name}
			</h3>
		</article>
	);
}
