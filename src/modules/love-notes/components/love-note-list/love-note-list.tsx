import Skeleton from 'react-loading-skeleton';
import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteCardWrapper } from '../love-note-card-wrapper/love-note-card-wrapper';

type Props = { loveNotes: LoveNote[] | null };

export function LoveNoteList({ loveNotes }: Props): JSX.Element {
	const listClass =
		'm-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center gap-4 px-8 pb-8';

	if (loveNotes === null) {
		return (
			<section className={listClass}>
				{new Array(5).fill(null).map((_, index) => (
					<Skeleton key={index} containerClassName='w-full' height={100} />
				))}
			</section>
		);
	}

	if (loveNotes.length === 0) {
		return (
			<section className={listClass}>
				<p className='text-center text-gray-500'>No love notes 🤧</p>
			</section>
		);
	}

	return (
		<section className={listClass}>
			{loveNotes.map((loveNote: LoveNote) => {
				return <LoveNoteCardWrapper key={loveNote.id} loveNote={loveNote} />;
			})}
		</section>
	);
}
