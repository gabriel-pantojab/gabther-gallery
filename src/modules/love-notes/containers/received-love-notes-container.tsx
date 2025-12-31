import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteList } from '../components/love-note-list/love-note-list';
import { useReceivedLoveNotes } from '../hooks/use-received-love-notes';
import { ReceivedLoveNoteCard } from '../components/received-love-note-card/received-love-note-card';

export function ReceivedLoveNotesContainer(): JSX.Element {
	const { loveNotes } = useReceivedLoveNotes();

	return (
		<>
			<header className='flex w-full items-center justify-between p-4'>
				<h2 className='text-2xl font-bold'>Received Love Notes</h2>
			</header>

			<LoveNoteList
				loveNotes={loveNotes}
				render={(loveNote: LoveNote | null) => (
					<ReceivedLoveNoteCard loveNote={loveNote} />
				)}
			/>
		</>
	);
}
