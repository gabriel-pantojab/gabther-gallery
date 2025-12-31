import { LoveNote } from '@/core/types/domain/love-note';

type Props = {
	loveNote: LoveNote | null;
	withBorder?: boolean;
};

export function LoveNoteCard({
	loveNote,
	withBorder = true,
}: Props): JSX.Element {
	if (loveNote === null) {
		return <article>Loading...</article>;
	}

	const border = withBorder ? 'border-2 border-gray-300' : '';
	const padding = withBorder ? 'p-4' : 'p-0';

	return (
		<article
			className={`flex h-full w-full flex-col justify-center rounded-md ${padding} ${border}`}
		>
			<h3 className='w-full font-bold'>{loveNote.title}</h3>

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
