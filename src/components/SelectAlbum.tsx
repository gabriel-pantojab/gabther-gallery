import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { getAlbumsAll } from '../utils/supabase';
import { type AlbumDB } from '../models/album.interface';

interface SelectAlbumProps {
	setAlbumSelected: (value: number | null) => void;
	setOpen: (value: boolean) => void;
	addSelectPhotosToAlbum: () => void;
}

export default function SelectAlbum({
	setAlbumSelected,
	setOpen,
	addSelectPhotosToAlbum,
}: SelectAlbumProps): JSX.Element {
	const { supabase } = useContext(SupabaseContext);

	const [albums, setAlbums] = useState<AlbumDB[] | null>(null);
	const [albumSelected, setAlbum] = useState<number | null>(null);

	useEffect(() => {
		const fetchAlbums = async (): Promise<void> => {
			try {
				const data = await getAlbumsAll(supabase);
				setAlbums(data);
			} catch (error) {
				setAlbums([]);
			}
		};

		void fetchAlbums();
	}, []);

	return (
		<div className='fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex items-center justify-center bg-slate-300 bg-opacity-50'>
			<div className='grid max-h-[300px] min-h-[300px] min-w-[300px] grid-rows-[55px_1fr_55px] rounded-md border bg-white md:max-h-[400px] md:min-h-[400px]'>
				<div className='flex flex-col items-center justify-center border-b-2 bg-white p-2'>
					<div className='flex w-full justify-end text-red-500 '>
						<button
							onClick={() => {
								setOpen(false);
							}}
						>
							X
						</button>
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
						albums.map(item => {
							return (
								<div
									onClick={() => {
										setAlbumSelected(item.id);
										setAlbum(item.id);
									}}
									key={item.id}
									className={`flex cursor-pointer items-center justify-between border-b-2 p-4
                  active:bg-blue-200
                ${
									albumSelected === item.id
										? 'bg-blue-200 hover:bg-blue-200'
										: 'hover:bg-gray-100'
								}
                `}
								>
									<p>{item.name}</p>
								</div>
							);
						})
					)}
				</div>

				<div className='flex gap-2 bg-white p-2'>
					<button
						onClick={() => {
							console.log('add');
							addSelectPhotosToAlbum();
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
