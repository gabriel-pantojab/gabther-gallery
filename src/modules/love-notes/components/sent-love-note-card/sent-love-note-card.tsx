import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteState } from '@/core/types/domain/enum/love-note-state';
import CheckIcon2 from '@/components/icons/CheckIcon2';
import { Navigable } from '@/shared/components/navigable/navigable';
import { LoveNoteCard } from '../love-note-card/love-note-card';

type Props = {
	loveNote: LoveNote | null;
};

export function SentLoveNoteCard({ loveNote }: Props): JSX.Element {
	if (loveNote === null) {
		return <article>Loading...</article>;
	}

	const to = `/secure/love-notes-old/received/${loveNote.id}`;
	const stateColor =
		loveNote.state === LoveNoteState.SENT ? 'gray-300' : 'blue-600';

	return (
		<article
			className={`flex h-full w-full flex-col justify-center rounded-md border-2 p-2 border-${stateColor}`}
		>
			<div className='flex w-full justify-end'>
				<span className={`flex font-bold text-${stateColor}`}>
					<CheckIcon2 width={20} height={20} />

					<CheckIcon2 width={20} height={20} />
				</span>
			</div>

			<Navigable to={to}>
				<LoveNoteCard loveNote={loveNote} withBorder={false} />
			</Navigable>
		</article>
	);
}
