import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type LoveNote as LoveNoteType } from '../models/loveNote.interface';
import { getLoveNote } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import BackIcon from './icons/BackIcon';

export default function LoveNote(): JSX.Element {
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
					rounded-md bg-gray-200 p-4'
				>
					<h3 className='font-bold'>{loveNote?.title}</h3>

					<pre>{loveNote?.message}</pre>
				</div>
			</div>
		</section>
	);
}
