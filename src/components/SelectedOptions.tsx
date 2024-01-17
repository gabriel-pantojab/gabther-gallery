interface SelectedOptionsProps {
	idsSelected: number[];
	children: React.ReactNode;
	className?: string;
}

export default function SelectedOptions({
	idsSelected,
	children,
	className = '',
}: SelectedOptionsProps): JSX.Element {
	return (
		<div className='w-full'>
			{idsSelected.length > 0 && (
				<div
					className={`sticky top-0 z-50 flex w-full justify-between border-y-2 bg-white px-4 py-2
        ${className}
        `}
				>
					<p>X {idsSelected.length} selected </p>

					{children}
				</div>
			)}
		</div>
	);
}
