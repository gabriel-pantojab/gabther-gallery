import CheckIcon from '@/components/icons/CheckIcon';

type Props = {
	photoId: number;
	isSelected: boolean;
	isHover: boolean;
	addIdSelected: (id: number) => void;
	removeIdSelected: (id: number) => void;
};

export function ToggleSelect({
	photoId,
	isSelected,
	isHover,
	addIdSelected,
	removeIdSelected,
}: Props): JSX.Element {
	return (
		<div
			className={`absolute top-0 z-50 cursor-pointer p-1 text-gray-300 transition duration-300 ease-in-out
            ${isHover || isSelected ? 'opacity-100' : 'opacity-0'}
            ${isSelected && 'bottom-0 left-0 right-0 h-full w-full text-blue-500'}
            ${!isSelected && 'hover:text-blue-500'}
          `}
			onClick={() => {
				if (isSelected) {
					removeIdSelected(photoId);
					return;
				}
				addIdSelected(photoId);
			}}
		>
			<CheckIcon
				className={`${isSelected && 'text-blue-500'} ${
					isSelected && 'hover:text-gray-300'
				}`}
			/>
		</div>
	);
}
