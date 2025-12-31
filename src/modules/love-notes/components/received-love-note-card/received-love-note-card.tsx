import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteCard } from '../love-note-card/love-note-card';
import { Navigable } from '@/shared/components/navigable/navigable';
import { LoveNoteState } from '@/core/types/domain/enum/love-note-state';

type Props = { loveNote: LoveNote | null };

export function ReceivedLoveNoteCard({ loveNote }: Props): JSX.Element {
	if (loveNote === null) return <div>Loading...</div>;
	const to = `/secure/love-notes-old/received/${loveNote.id}`;
	return (
		<article
			className={`flex h-full w-full flex-col justify-center rounded-md border-2 p-4 ${
				loveNote.state === LoveNoteState.SENT ? 'opacity-100' : 'opacity-60'
			}`}
		>
			<Navigable to={to}>
				<LoveNoteCard loveNote={loveNote} withBorder={false} />
			</Navigable>
		</article>
	);
}
