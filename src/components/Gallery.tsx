import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { type PhotoDB } from '../models/photo.interface';

export default function Gallery(): JSX.Element {
	const { supabase } = useContext(SupabaseContext);

	const [photos, setPhotos] = useState<PhotoDB[]>([]);

	useEffect(() => {
		getPhotos()
			.then(data => {
				setPhotos(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const getPhotos = async (): Promise<PhotoDB[]> => {
		const { data, error } = await supabase.from('photo').select('*');

		if (error !== null) {
			throw error;
		}

		return data;
	};

	return (
		<section className='w-full p-4'>
			<h2>Gallery</h2>

			<div className='grid w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
				{photos.map(photo => {
					return (
						<div
							key={photo.id}
							style={{
								animationTimeline: 'view()',
								animationRange: 'entry 20% cover 30%',
							}}
							className={`
							animate-reveal
						overflow-hidden rounded-md bg-gray-200
						`}
						>
							<img
								className='w-full bg-cover'
								src={photo.url_image}
								alt={photo.name}
								width={100}
								height={100}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
}
