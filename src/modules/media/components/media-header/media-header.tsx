import { useNavigate } from 'react-router-dom';
import BackIcon from '@/components/icons/BackIcon';
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
	const navigation = useNavigate();

	const goBack = () => {
		navigation(-1);
	};

	return (
		<header className='flex w-full flex-col gap-4 md:flex-row md:justify-between'>
			<div className='flex gap-1'>
				<span
					onClick={goBack}
					className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
				>
					<BackIcon />
				</span>
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
