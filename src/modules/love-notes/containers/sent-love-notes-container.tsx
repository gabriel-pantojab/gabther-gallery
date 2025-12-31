import { Link } from 'react-router-dom';
import { LoveNoteList } from '../components/love-note-list/love-note-list';
import { useSentLoveNotes } from '../hooks/use-sent-love-notes';
import { SentLoveNoteCard } from '../components/sent-love-note-card/sent-love-note-card';
import { LoveNote } from '@/core/types/domain/love-note';

export function SentLoveNotesContainer(): JSX.Element {
	const { loveNotes } = useSentLoveNotes();

	return (
		<>
			<header className='flex w-full items-center justify-between p-4'>
				<h2 className='text-2xl font-bold'>Send Love Notes</h2>

				<Link
					to={`/secure/love-notes-old/sends/send`}
					className='flex justify-center rounded-md bg-blue-500 px-2 py-1 text-sm text-white active:bg-blue-600'
				>
					New 💖
				</Link>
			</header>

			<LoveNoteList
				loveNotes={loveNotes}
				render={(loveNote: LoveNote | null) => (
					<SentLoveNoteCard loveNote={loveNote} />
				)}
			/>
		</>
	);
}
