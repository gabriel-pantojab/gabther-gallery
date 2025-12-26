import { useState } from 'react';
import { Album } from '@/core/types/domain/album.model';

type Props = { albums: Album[]; eventSelectAlbum: (albumId: number) => void };

export function SelectAlbum({ albums, eventSelectAlbum }: Props): JSX.Element {
	const [selectedAlbumId, setSelectedAlbumId] = useState<number>(-1);

	return (
		<div className='fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex items-center justify-center bg-slate-300 bg-opacity-50'>
			<div className='grid max-h-[300px] min-h-[300px] min-w-[300px] grid-rows-[55px_1fr_55px] rounded-md border bg-white md:max-h-[400px] md:min-h-[400px]'>
				<div className='flex flex-col items-center justify-center border-b-2 bg-white p-2'>
					<div className='flex w-full justify-end text-red-500 '>
						<button onClick={() => eventSelectAlbum(-1)}>X</button>
					</div>

					<p className='w-full text-center text-xl font-bold'>Select Album</p>
				</div>

				<div className='max-h-full overflow-auto'>
					{albums === null ? (
						<div className='flex h-full items-center justify-center'>
							<p>Loading...</p>
						</div>
					) : albums.length === 0 ? (
						<div className='flex h-full items-center justify-center'>
							<p>No albums</p>
						</div>
					) : (
						albums.map(album => {
							return (
								<div
									onClick={() => setSelectedAlbumId(album.id)}
									key={album.id}
									className={`flex cursor-pointer items-center justify-between border-b-2 p-4
                  active:bg-blue-200
                ${
									selectedAlbumId === album.id
										? 'bg-blue-200 hover:bg-blue-200'
										: 'hover:bg-gray-100'
								}
                `}
								>
									<p>{album.name}</p>
								</div>
							);
						})
					)}
				</div>

				<div className='flex gap-2 bg-white p-2'>
					<button
						onClick={() => {
							eventSelectAlbum(selectedAlbumId);
						}}
						className='w-full rounded-md bg-blue-500 py-2 text-sm text-white'
					>
						Add to album
					</button>
				</div>
			</div>
		</div>
	);
}
