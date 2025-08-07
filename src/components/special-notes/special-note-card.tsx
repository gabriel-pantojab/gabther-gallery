import { Link } from 'react-router-dom';

interface SpecialNoteCardProps {
	specialName: string;
	specialRoute: string;
}

export function SpecialNoteCard({
	specialName,
	specialRoute,
}: SpecialNoteCardProps): React.ReactNode {
	return (
		<article className='flex min-h-52 w-full flex-col items-center justify-center gap-4 rounded-md bg-[#e6e6fa] p-4 shadow-lg'>
			<header>
				<h3 className='font-bold'>{specialName}</h3>
			</header>

			<footer>
				<Link to={`${specialRoute}`} className='text-blue-400'>
					Go to note
				</Link>
			</footer>
		</article>
	);
}
