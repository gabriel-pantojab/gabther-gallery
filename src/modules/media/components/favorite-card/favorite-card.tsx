import StarIcon from '@/components/icons/StarIcon';
import { Photo } from '@/core/types/domain/photo.model';
import { MediaCard } from '@/shared/components/media-card/media-card';
import { Navigable } from '@/shared/components/navigable/navigable';

type Props = {
	media: Photo | null;
	isLoggedIn: boolean;
	eventRemoveFavorite: (id: number) => void;
};

export function FavoriteCard({
	media,
	isLoggedIn,
	eventRemoveFavorite,
}: Props): JSX.Element {
	const to = '';

	const handleRemoveFavorite = () => {
		if (media) eventRemoveFavorite(media.id);
	};

	return (
		<article className='relative'>
			{isLoggedIn && (
				<button
					onClick={handleRemoveFavorite}
					title='Remove from favorites'
					className='absolute left-0 top-0 p-1 text-[#B57EDC]
    transition duration-300 ease-in-out hover:text-[#8E5EDC]
  '
				>
					<StarIcon fill />
				</button>
			)}

			<Navigable enabled to={to}>
				<MediaCard media={media} />
			</Navigable>
		</article>
	);
}
