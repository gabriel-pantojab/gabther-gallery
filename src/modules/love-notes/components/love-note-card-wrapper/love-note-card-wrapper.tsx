import { Navigable } from '@/shared/components/navigable/navigable';
import { LoveNoteCard } from '../love-note-card/love-note-card';
import { LoveNote } from '@/core/types/domain/love-note';

type Props = { loveNote: LoveNote | null };

export function LoveNoteCardWrapper({ loveNote }: Props): JSX.Element {
	// TODO: replace path
	const to = `/secure/love-notes-old/sends/${loveNote?.id}`;
	return (
		<Navigable enabled to={to}>
			<LoveNoteCard loveNote={loveNote} />
		</Navigable>
	);
}
