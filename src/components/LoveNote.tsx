import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type LoveNote as LoveNoteType } from '../models/loveNote.interface';
import { getLoveNote, readLoveNote } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import BackIcon from './icons/BackIcon';
import { UserContext } from '../context/userContext';
import Reaction from './Reaction';
import { ReactionType } from '../models/reaction.interface';
import useReactions from '../hooks/useReactions';

export default function LoveNote(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	const { supabase } = useContext(SupabaseContext);
	const { idLoveNote } = useParams();
	const [loveNote, setLoveNote] = useState<LoveNoteType | null>(null);

	const navigate = useNavigate();
	const { reactions, reactionUser, handleUpdateReaction } = useReactions({
		idLoveNote: Number(idLoveNote),
	});

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
						{reactions.map(reaction => {
							return <Reaction key={reaction} type={reaction} />;
						})}
					</div>

					<div className='flex gap-2 border-b-2 py-2 pl-4'>
						<div
							className='cursor-pointer p-1 hover:bg-gray-200'
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.LOVE);
							}}
						>
							<span
								className={`flex items-center justify-center gap-2 text-sm text-gray-500
								${reactionUser === ReactionType.LOVE ? 'text-red-500' : ''}
							`}
							>
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

						<div
							className='cursor-pointer p-1 hover:bg-gray-200'
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.HAPPY);
							}}
						>
							<span
								className={`flex items-center justify-center gap-2 text-sm text-gray-500
								${reactionUser === ReactionType.HAPPY ? 'text-yellow-400' : ''}
							`}
							>
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

									<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />

									<path d='M9 9l.01 0' />

									<path d='M15 9l.01 0' />

									<path d='M8 13a4 4 0 1 0 8 0h-8' />
								</svg>
								Me alegra
							</span>
						</div>

						<div
							className='cursor-pointer p-1 hover:bg-gray-200'
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.SAD);
							}}
						>
							<span
								className={`flex items-center justify-center gap-2 text-sm text-gray-500
								${reactionUser === ReactionType.SAD ? 'text-yellow-400' : ''}
							`}
							>
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

									<path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />

									<path d='M9 10l.01 0' />

									<path d='M15 10l.01 0' />

									<path d='M9.5 15.25a3.5 3.5 0 0 1 5 0' />
								</svg>
								Me entristece
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
