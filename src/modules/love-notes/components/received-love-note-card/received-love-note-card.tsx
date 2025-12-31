import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteState } from '@/core/types/domain/enum/love-note-state';
import { Navigable } from '@/shared/components/navigable/navigable';
import { LoveNoteCard } from '../love-note-card/love-note-card';

type Props = { loveNote: LoveNote | null };

export function ReceivedLoveNoteCard({ loveNote }: Props): JSX.Element {
	if (loveNote === null) return <div>Loading...</div>;
	const to = `/secure/love-notes-old/received/${loveNote.id}`;
	return (
		<article
			className={`flex h-full w-full flex-col justify-center rounded-md border-2 border-black p-4 ${
				loveNote.state === LoveNoteState.SENT ? 'opacity-100' : 'opacity-40'
			}`}
		>
			<Navigable to={to}>
				<LoveNoteCard loveNote={loveNote} withBorder={false} />
			</Navigable>
		</article>
	);
}
