type Props = {
	countSelectedIds: number;
	children: React.ReactNode;
	className?: string;
};

export function MediaSelectedOptions({
	countSelectedIds,
	children,
	className = '',
}: Props): JSX.Element {
	return (
		<div className='sticky top-0 z-30 w-full'>
			{countSelectedIds > 0 && (
				<div
					className={`flex w-full justify-between border-y-2 bg-white px-4 py-2
        ${className}
        `}
				>
					<p className='flex items-center'>X {countSelectedIds} selected </p>

					<div className='flex gap-2'>{children}</div>
				</div>
			)}
		</div>
	);
}
