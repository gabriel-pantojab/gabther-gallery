import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type LoveNote as LoveNoteType } from '../models/loveNote.interface';
import { getLoveNote, readLoveNote } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import BackIcon from './icons/BackIcon';
import { UserContext } from '../context/userContext';

export default function LoveNote(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { supabase } = useContext(SupabaseContext);
	const { idLoveNote } = useParams();
	const [loveNote, setLoveNote] = useState<LoveNoteType | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		getLoveNote(Number(idLoveNote), supabase)
			.then(data => {
				setLoveNote(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (currentUser === null || loveNote === null) return;
		if (loveNote?.author !== currentUser?.id && loveNote?.state === 'SENT') {
			readLoveNote(Number(idLoveNote), supabase)
				.then(() => {
					console.log('read');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}, [loveNote]);

	return (
		<section className='w-full'>
			<header className='flex w-full justify-between p-4'>
				{loveNote !== null && (
					<p>
						<span className='font-bold'>Date: </span>
						{new Date(loveNote.created_at).toLocaleString()}
					</p>
				)}

				<button
					className='flex items-center gap-2'
					onClick={() => {
						navigate(-1);
					}}
				>
					<BackIcon />
				</button>
			</header>

			<div className='w-full p-4'>
				<div
					className='m-auto flex min-h-[500px] w-full max-w-[700px] flex-col  items-center justify-center gap-4
					rounded-md bg-gray-200 p-2'
				>
					{
						<figure className='h-full w-full'>
							<img
								className='h-full w-full object-contain'
								src={loveNote?.url_love_note}
								alt={loveNote?.title}
							/>
						</figure>
					}
				</div>
			</div>
		</section>
	);
}
