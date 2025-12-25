import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
	photoId: number;
	navigate: boolean;
	isSelected: boolean;
	children: ReactNode;
};

export function CoverMediaElement({
	photoId,
	navigate,
	isSelected,
	children,
}: Props): JSX.Element {
	if (navigate) {
		return (
			<Link
				to={`/photos/photo/${photoId}`}
				className={`${isSelected && 'bg-blue-100'} block h-full w-full`}
			>
				{children}
			</Link>
		);
	}

	return (
		<div className={`${isSelected && 'bg-blue-100'} block h-full w-full`}>
			{children}
		</div>
	);
}
