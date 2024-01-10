import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type LoveNote as LoveNoteType } from '../models/loveNote.interface';
import { getLoveNote, readLoveNote } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import BackIcon from '../components/icons/BackIcon';
import { UserContext } from '../context/userContext';
import Reaction from '../components/Reaction';
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

				<div className='m-auto w-[290px] md:w-[600px]'>
					<div className='flex border-b-2 pb-2 pl-4'>
						{reactions.map(reaction => {
							return <Reaction key={reaction} type={reaction} />;
						})}
					</div>

					<div className='flex justify-center gap-2 border-b-2 py-2'>
						<div
							className={`cursor-pointer p-1 text-red-500 grayscale hover:bg-gray-200
							${reactionUser === ReactionType.LOVE && 'grayscale-0'}
							`}
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.LOVE);
							}}
						>
							<span
								className={`flex w-full flex-col items-center justify-center gap-2 text-xs md:flex-row
							`}
							>
								<span className={`text-sm`}>💖</span>
								Me encanta
							</span>
						</div>

						<div
							className={`cursor-pointer p-1 text-yellow-400 grayscale hover:bg-gray-200
							${reactionUser === ReactionType.HAPPY && 'grayscale-0'}
							`}
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.HAPPY);
							}}
						>
							<span
								className={`flex flex-col items-center justify-center gap-2 text-xs md:flex-row
							`}
							>
								<span className={`text-sm`}>🤗</span>
								Me alegra
							</span>
						</div>

						<div
							className={`cursor-pointer p-1 text-yellow-400 grayscale hover:bg-gray-200
							${reactionUser === ReactionType.SAD && 'grayscale-0'}
							`}
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/no-floating-promises
								handleUpdateReaction(ReactionType.SAD);
							}}
						>
							<span
								className={`flex flex-col items-center justify-center gap-2 text-xs md:flex-row`}
							>
								<span className={`text-sm`}>😢</span>
								Me entristece
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
