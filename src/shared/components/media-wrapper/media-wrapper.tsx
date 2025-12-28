import CheckIcon from '@/components/icons/CheckIcon';

import style from './media-wrapper.module.css';

type Props = {
	isLoggedIn: boolean;
	isSelected: boolean;
	children: React.ReactNode;
	eventToggleSelect: (selectState: boolean) => void;
};

export function MediaWrapper({
	isLoggedIn,
	isSelected,
	children,
	eventToggleSelect,
}: Props): JSX.Element {
	const handleToggleSelect = () => {
		eventToggleSelect(!isSelected);
	};

	const wrapperClasses = [style.mediaWrapper];
	if (isLoggedIn) {
		wrapperClasses.push(style.mediaWrapperHover);
	}
	if (isSelected) {
		wrapperClasses.push(style.mediaWrapperSelected);
	}

	const selectIconClasses = [];
	if (isLoggedIn && isSelected) {
		selectIconClasses.push(style.selected);
	} else if (isLoggedIn && !isSelected) {
		selectIconClasses.push(style.unselected);
	}

	const selectIconWrapperClasses = [style.selectIconWrapper];
	if (isLoggedIn && isSelected) {
		selectIconWrapperClasses.push(style.selectIconWrapperSelected);
	}

	return (
		<div className={wrapperClasses.join(' ')}>
			<div className={selectIconWrapperClasses.join(' ')}>
				<button
					className={selectIconClasses.join(' ')}
					onClick={handleToggleSelect}
				>
					<CheckIcon />
				</button>
			</div>

			<div className={`${style.content} ${isSelected && style.scale75}`}>
				{children}
			</div>
		</div>
	);
}
