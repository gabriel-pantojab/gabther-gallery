interface SpecialNoteListProps {
	children: React.ReactNode;
}

export function SpecialNoteList({
	children,
}: SpecialNoteListProps): React.ReactNode {
	return (
		<article className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'>
			{children}
		</article>
	);
}
