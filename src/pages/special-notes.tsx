import { SpecialNoteCard } from '../components/special-notes/special-note-card';
import { SpecialNoteList } from '../components/special-notes/special-note-list';
import { SPECIAL_NOTES } from '../shared/constants/special-notes';

export function SpecialNotes(): React.ReactNode {
	return (
		<article className='flex w-full flex-col gap-4 p-4'>
			<header>
				<h2 className='text-2xl font-bold'>Special Notes</h2>
			</header>

			<SpecialNoteList>
				{SPECIAL_NOTES.map(specialNote => (
					<SpecialNoteCard key={specialNote.specialRoute} {...specialNote} />
				))}
			</SpecialNoteList>
		</article>
	);
}
