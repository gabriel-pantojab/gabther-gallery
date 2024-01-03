import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { getSendLoveNotes } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';
import { type LoveNote } from '../models/loveNote.interface';
import CheckIcon2 from './icons/CheckIcon2';

export default function SendList(): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);

	const [sendLoveNotes, setSendLoveNotes] = useState<LoveNote[] | null>([]);

	useEffect(() => {
		if (currentUser === null) return;
		setSendLoveNotes(null);
		getSendLoveNotes(currentUser.id, supabase)
			.then(data => {
				setSendLoveNotes(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [currentUser]);

	return (
		<section className='m-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center gap-4'>
			{sendLoveNotes === null ? (
				new Array(5)
					.fill(null)
					.map((_, index) => (
						<Skeleton key={index} containerClassName='w-full' height={100} />
					))
			) : sendLoveNotes.length === 0 ? (
				<p className='text-center text-gray-500'>No love notes sent yet 🤧</p>
			) : (
				sendLoveNotes.map((loveNote: LoveNote) => {
					return (
						<Link
							key={loveNote.id}
							to={`/love-notes/sends/${loveNote.id}`}
							className='w-full'
						>
							<article
								className={`flex h-full w-full flex-col  justify-center rounded-md border-2 p-4 ${
									loveNote.state === 'SENT'
										? 'border-gray-300'
										: 'border-blue-600'
								}`}
							>
								<div className='flex w-full'>
									<h3 className='w-full font-bold'>{loveNote.title}</h3>

									{loveNote.state === 'SENT' ? (
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
									<span className='font-bold'>To: </span>{' '}
									{loveNote.email_recipient}
								</p>

								<p>
									<span className='font-bold'>Date: </span>

									{new Date(loveNote.created_at).toLocaleString()}
								</p>
							</article>
						</Link>
					);
				})
			)}
		</section>
	);
}
