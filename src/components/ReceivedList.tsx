import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getReceivedLoveNotes } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';
import { StateLoveNote, type LoveNote } from '../models/loveNote.interface';

export default function ReceivedList(): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);

	const [receivedLoveNotes, setReceivedLoveNotes] = useState<LoveNote[]>([]);

	const getLoveNotes = async (): Promise<void> => {
		if (currentUser === null) return;
		try {
			const data = await getReceivedLoveNotes(currentUser.id, supabase);
			setReceivedLoveNotes(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getLoveNotes();
	}, [currentUser]);

	useEffect(() => {
		const insertChannel = supabase
			.channel('insert-received-love-note')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'love_note' },
				(payload: any) => {
					if (payload.new.author !== currentUser?.id) {
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						setReceivedLoveNotes(prev => {
							return [payload.new, ...prev];
						});
					}
				},
			)
			.subscribe();

		return () => {
			insertChannel.unsubscribe();
		};
	}, []);

	return (
		<section className='m-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center gap-4'>
			{receivedLoveNotes.map((loveNote: LoveNote) => {
				return (
					<Link
						key={loveNote.id}
						to={`/love-notes/received/${loveNote.id}`}
						className={`w-full ${
							loveNote.state === StateLoveNote.SENT
								? 'opacity-100'
								: 'opacity-60'
						}`}
					>
						<article
							className={`flex h-full w-full flex-col justify-center rounded-md border-2 p-4
						${loveNote.state === StateLoveNote.SENT ? 'border-black' : 'border-gray-300'}`}
						>
							<h3 className='font-bold'>{loveNote.title}</h3>

							<p>
								<span className='font-bold'>From: </span>
								{loveNote.email_author}
							</p>

							<p>
								<span className='font-bold'>Date: </span>

								{new Date(loveNote.created_at).toLocaleString()}
							</p>
						</article>
					</Link>
				);
			})}
		</section>
	);
}
