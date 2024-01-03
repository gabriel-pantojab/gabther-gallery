import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useOnClickOutside from '../hooks/useOnClickOutside';
import SideBarItem from './SideBarItem';
import PhotoIcon from './icons/PhotoIcon';
import AlbumIcon from './icons/AlbumIcon';
import FavoriteIcon from './icons/FavoriteIcon';
import { UserContext } from '../context/userContext';
import MailIcon from './icons/MailIcon';
import { getCountUnreadLoveNotes } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';

interface SideBarProps {
	open: boolean;
	close: () => void;
}

export default function SideBar({ open, close }: SideBarProps): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const myRefElement1 = useRef(null);
	const handleClickOutsideFn = (): void => {
		if (open) {
			close();
		}
	};

	useOnClickOutside(myRefElement1, handleClickOutsideFn);
	const { signInWithEmailAndPassword, signOut, currentUser } =
		useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [unreadLoveNotes, setUnreadLoveNotes] = useState(0);

	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();

		try {
			if (email !== '' && password !== '') {
				await signInWithEmailAndPassword(email.trim(), password);
			} else {
				toast.warning('Email and password are required.', {
					position: 'bottom-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (error: any) {
			toast.error('Error, ' + error.message, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		if (currentUser !== null) {
			getCountUnreadLoveNotes(currentUser.id, supabase)
				.then(data => {
					setUnreadLoveNotes(data);
				})
				.catch(error => {
					console.log(error);
				});
		}

		const channel = supabase
			.channel('room1')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'love_note' },
				(payload: any) => {
					if (payload.new.state === 'READ') {
						setUnreadLoveNotes(prev => {
							return prev - 1;
						});
					} else {
						setUnreadLoveNotes(prev => {
							return prev + 1;
						});
					}
				},
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [currentUser]);

	return (
		<aside
			ref={myRefElement1}
			className={`${
				!open ? '-translate-x-full' : 'translate-x-0'
			} fixed bottom-0 left-0 top-0 z-40 h-screen min-w-72 overflow-hidden transition-transform duration-300 lg:sticky lg:translate-x-0`}
		>
			<div className='h-full overflow-hidden overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800'>
				<div className='mb-4 flex w-full flex-col items-center justify-center'>
					<figure className='max-h-[90px] max-w-[90px] overflow-hidden rounded-full'>
						<img src={currentUser?.avatar_url} alt={currentUser?.name} />
					</figure>

					<p>{currentUser?.name}</p>
				</div>

				<ul className='flex w-full flex-col gap-4'>
					<SideBarItem path='/photos' close={close}>
						<PhotoIcon />

						<span>Photos</span>
					</SideBarItem>

					<SideBarItem close={close} path='/albums'>
						<AlbumIcon />

						<span>Albums</span>
					</SideBarItem>

					<SideBarItem close={close} path='/favorites'>
						<FavoriteIcon />

						<span>Favorites</span>
					</SideBarItem>

					{currentUser !== null && (
						<li className='w-full'>
							<div className='flex w-full flex-col'>
								<div className='flex w-full items-center gap-4 border-b-2 p-1 pl-0'>
									<MailIcon />

									<span>Cartas</span>
								</div>

								<ul className='flex w-full flex-col gap-3 py-2 pl-8'>
									<SideBarItem
										close={close}
										path='/love-notes/sends'
										className='border-b-2 pb-3 pl-2'
									>
										<span>Enviadas</span>
									</SideBarItem>

									<SideBarItem
										close={close}
										path='/love-notes/received'
										className='border-b-2 px-2 pb-3'
									>
										<span
											className={`
											w-full 
											${unreadLoveNotes > 0 && 'font-bold'}
										`}
										>
											Recibidas
										</span>

										{unreadLoveNotes > 0 && (
											<span className='ml-2 flex items-baseline justify-center rounded-full bg-[#B195D2] px-2 text-sm text-white'>
												{unreadLoveNotes}
											</span>
										)}
									</SideBarItem>
								</ul>
							</div>
						</li>
					)}

					{currentUser === null && (
						<li className='flex w-full items-center justify-center'>
							<form
								className='flex w-full flex-col gap-4'
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onSubmit={onSubmit}
							>
								<label htmlFor='email' className='flex w-full flex-col'>
									<input
										type='text'
										id='email'
										name='email'
										placeholder='Email'
										value={email}
										onChange={e => {
											setEmail(e.target.value);
										}}
										className='border-b-2 border-[#CDB0EE] bg-transparent p-1 pl-2 focus:outline-none'
									/>
								</label>

								<label htmlFor='password' className='flex w-full flex-col'>
									<input
										type='password'
										id='password'
										name='password'
										placeholder='Password'
										value={password}
										onChange={e => {
											setPassword(e.target.value);
										}}
										className='border-b-2 border-[#CDB0EE] bg-transparent p-1 pl-2 focus:outline-none'
									/>
								</label>

								<div className='flex w-full gap-4'>
									<button
										type='submit'
										className='flex w-full justify-center rounded-md bg-blue-500 text-white'
									>
										SignIn
									</button>
								</div>
							</form>
						</li>
					)}

					<li className='w-full'>
						<button
							onClick={() => {
								signOut()
									.then(() => {
										close();
									})
									.catch(() => {
										close();
									});
							}}
							className='flex w-full justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700'
						>
							SignOut
						</button>
					</li>
				</ul>
			</div>
		</aside>
	);
}
