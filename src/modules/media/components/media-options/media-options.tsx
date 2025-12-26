import DotsVerticalIcon from '@/components/icons/DotsVertical';
import StarIcon from '@/components/icons/StarIcon';
import TrashIcon from '@/components/icons/TrashIcon';

type Props = {
	isFavorite: boolean;
	toggleFavorite: () => void;
	deleteMedia: () => void;
};

export function MediaOptions({
	isFavorite,
	toggleFavorite,
	deleteMedia,
}: Props): JSX.Element {
	return (
		<div className='flex justify-end gap-2 text-gray-600'>
			<span
				className='cursor-pointer text-[#B57EDC] transition duration-300 ease-in-out active:scale-95'
				onClick={toggleFavorite}
			>
				<StarIcon fill={isFavorite} />
			</span>

			<span
				className='cursor-pointer transition duration-300 ease-in-out active:scale-95'
				onClick={deleteMedia}
			>
				<TrashIcon />
			</span>

			<span className='cursor-pointer transition duration-300 ease-in-out active:scale-95'>
				<DotsVerticalIcon />
			</span>
		</div>
	);
}
