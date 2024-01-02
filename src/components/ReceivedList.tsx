import { useContext, useEffect, useState } from 'react';

import { getReceivedLoveNotes } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';
import { type LoveNote } from '../models/loveNote.interface';
import { Link } from 'react-router-dom';

export default function ReceivedList(): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);

	const [receivedLoveNotes, setReceivedLoveNotes] = useState<LoveNote[]>([]);

	useEffect(() => {
		if (currentUser === null) return;
		getReceivedLoveNotes(currentUser.id, supabase)
			.then(data => {
				setReceivedLoveNotes(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [currentUser]);

	return (
		<section className='m-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center gap-4'>
			{receivedLoveNotes.map((loveNote: LoveNote) => {
				return (
					<Link
						key={loveNote.id}
						to={`/love-notes/received/${loveNote.id}`}
						className='w-full'
					>
						<article className='flex h-full w-full flex-col justify-center rounded-md border-2 p-4'>
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
