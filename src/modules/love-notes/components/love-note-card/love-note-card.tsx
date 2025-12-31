import CheckIcon2 from '@/components/icons/CheckIcon2';
import { LoveNoteState } from '@/core/types/domain/enum/love-note-state';
import { LoveNote } from '@/core/types/domain/love-note';

type Props = {
	loveNote: LoveNote | null;
};

export function LoveNoteCard({ loveNote }: Props): JSX.Element {
	if (loveNote === null) {
		return <article>Loading...</article>;
	}

	return (
		<article
			className={`flex h-full w-full flex-col  justify-center rounded-md border-2 p-4 ${
				loveNote.state === LoveNoteState.SENT
					? 'border-gray-300'
					: 'border-blue-600'
			}`}
		>
			<div className='flex w-full'>
				<h3 className='w-full font-bold'>{loveNote.title}</h3>

				{loveNote.state === LoveNoteState.SENT ? (
					<span className='flex font-bold text-gray-400'>
						<CheckIcon2 width={20} height={20} />

						<CheckIcon2 width={20} height={20} />
					</span>
				) : (
					<span className='flex font-bold text-blue-600'>
						<CheckIcon2 width={20} height={20} />

						<CheckIcon2 width={20} height={20} />
					</span>
				)}
			</div>

			<p>
				<span className='font-bold'>To: </span> {loveNote.emailRecipient}
			</p>

			<p>
				<span className='font-bold'>Date: </span>

				{new Date(loveNote.createdAt).toLocaleString()}
			</p>
		</article>
	);
}
