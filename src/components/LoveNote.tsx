import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type LoveNote as LoveNoteType } from '../models/loveNote.interface';
import {
	getLoveNote,
	getReactionsLoveNote,
	readLoveNote,
} from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import BackIcon from './icons/BackIcon';
import { UserContext } from '../context/userContext';
import Reaction from './Reaction';
import { ReactionType } from '../models/reaction.interface';

type Reactions = Record<ReactionType, string[]>;

export default function LoveNote(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { supabase } = useContext(SupabaseContext);
	const { idLoveNote } = useParams();
	const [loveNote, setLoveNote] = useState<LoveNoteType | null>(null);
	const [reactions, setReactions] = useState<Reactions>({
		[ReactionType.HAPPY]: [],
		[ReactionType.LOVE]: [],
		[ReactionType.SAD]: [],
	});
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

	useEffect(() => {
		getReactionsLoveNote(Number(idLoveNote), supabase)
			.then(data => {
				const reactions: Reactions = {
					[ReactionType.HAPPY]: [],
					[ReactionType.LOVE]: [],
					[ReactionType.SAD]: [],
				};
				data.forEach(reaction => {
					reactions[reaction.reaction].push(reaction.name_user);
				});
				setReactions(reactions);
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

			<div className='flex w-full flex-col gap-4 p-2 md:gap-4'>
				<figure className='m-auto h-[400px] w-[290px] md:h-[700px] md:w-[600px]'>
					<img
						className='h-full w-full'
						src={loveNote?.url_love_note}
						alt={loveNote?.title}
					/>
				</figure>

				<div className='m-auto h-[400px] w-[290px] md:h-[700px] md:w-[600px]'>
					<div className='flex border-b-2 pb-2 pl-4'>
						{reactions[ReactionType.LOVE].length > 0 && (
							<Reaction type={ReactionType.LOVE} />
						)}

						{reactions[ReactionType.HAPPY].length > 0 && (
							<Reaction type={ReactionType.HAPPY} />
						)}

						{reactions[ReactionType.SAD].length > 0 && (
							<Reaction type={ReactionType.SAD} />
						)}
					</div>

					<div className='flex border-b-2 py-2 pl-4'>
						<div className='cursor-pointer p-1 hover:bg-gray-200'>
							<span className='flex gap-2 text-gray-500'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none' />

									<path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
								</svg>
								Me encanta
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
