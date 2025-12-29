import { GoBack } from '@/shared/components/go-back/go-back';
import { MediaOptions } from '../media-options/media-options';

type Props = {
	isFavorite: boolean;
	isLoggedIn: boolean;
	toggleFavorite: () => void;
	deleteMedia: () => void;
};

export function MediaHeader({
	isFavorite,
	isLoggedIn,
	toggleFavorite,
	deleteMedia,
}: Props): JSX.Element {
	return (
		<header className='flex w-full flex-col gap-4 md:flex-row md:justify-between'>
			<div className='flex gap-1'>
				<GoBack />
			</div>

			{isLoggedIn && (
				<MediaOptions
					isFavorite={isFavorite}
					toggleFavorite={toggleFavorite}
					deleteMedia={deleteMedia}
				/>
			)}
		</header>
	);
}
