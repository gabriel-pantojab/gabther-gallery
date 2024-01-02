import { useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import useOnClickOutside from '../hooks/useOnClickOutside';
import SideBarItem from './SideBarItem';
import PhotoIcon from './icons/PhotoIcon';
import AlbumIcon from './icons/AlbumIcon';
import FavoriteIcon from './icons/FavoriteIcon';
import { UserContext } from '../context/userContext';
import MailIcon from './icons/MailIcon';

interface SideBarProps {
	open: boolean;
	close: () => void;
}

export default function SideBar({ open, close }: SideBarProps): JSX.Element {
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

	return (
		<aside
			ref={myRefElement1}
			className={`${
				!open ? '-translate-x-full' : 'translate-x-0'
			} fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 lg:sticky lg:translate-x-0`}
		>
			<div className='h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800'>
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

								<ul className='ml-8 flex w-full flex-col gap-3 p-2'>
									<SideBarItem close={close} path='/love-notes/sends'>
										<span>Enviadas</span>
									</SideBarItem>

									<SideBarItem close={close} path='/love-notes/received'>
										<span>Recibidas</span>
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
