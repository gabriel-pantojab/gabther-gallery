import { useContext, useRef, useState } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import SideBarItem from './SideBarItem';
import PhotoIcon from './icons/PhotoIcon';
import AlbumIcon from './icons/AlbumIcon';
import FavoriteIcon from './icons/FavoriteIcon';
import { UserContext } from '../context/userContext';
import MailIcon from './icons/MailIcon';
import Loader from './Loader';
import useLogin from '../hooks/useLogin';
import useUnreadLoveNotes from '../hooks/useUnreadLoveNotes';
import User from './User';
import LoginForm from './LoginForm';

const publicItems = [
	{
		name: 'Photos',
		icon: <PhotoIcon />,
		path: '/photos',
	},
	{
		name: 'Albums',
		icon: <AlbumIcon />,
		path: '/albums',
	},
	{
		name: 'Favorites',
		icon: <FavoriteIcon />,
		path: '/favorites',
	},
];

interface SideBarProps {
	open: boolean;
	close: () => void;
}

export default function SideBar({ open, close }: SideBarProps): JSX.Element {
	const { signOut, currentUser } = useContext(UserContext);

	const myRefElement1 = useRef(null);
	const handleClickOutsideFn = (): void => {
		if (open) {
			close();
		}
	};

	useOnClickOutside(myRefElement1, handleClickOutsideFn);
	const { email, password, loading, setEmail, setPassword, login } = useLogin();
	const { unreadLoveNotes } = useUnreadLoveNotes();
	const letterList = useRef<HTMLUListElement>(null);
	const [isLetterOpen, setIsLetterOpen] = useState(false);

	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		await login();
	};

	return (
		<aside
			ref={myRefElement1}
			className={`${
				!open ? '-translate-x-full' : 'translate-x-0'
			} fixed bottom-0 left-0 top-0 z-40 h-screen min-w-72 overflow-hidden transition-transform duration-300 lg:sticky lg:translate-x-0`}
		>
			<div className='h-full overflow-hidden overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800'>
				{currentUser !== null && (
					<User avatarUrl={currentUser?.avatar_url} name={currentUser?.name} />
				)}

				<ul className='flex w-full flex-col gap-2'>
					{publicItems.map((item, index) => (
						<SideBarItem key={index} close={close} path={item.path}>
							{item.icon}

							<span>{item.name}</span>
						</SideBarItem>
					))}

					{currentUser !== null && (
						<li className='w-full rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-gray-200'>
							<div
								onClick={() => {
									setIsLetterOpen(!isLetterOpen);
								}}
								className='flex w-full cursor-pointer flex-col'
							>
								<div className='flex w-full items-center gap-4 border-b-2 border-gray-400 pb-2 pl-0'>
									<MailIcon />

									<span>Cartas</span>
								</div>

								<div
									style={{
										height: isLetterOpen ? letterList.current?.scrollHeight : 0,
									}}
									className='overflow-hidden transition-all duration-300'
								>
									<ul
										ref={letterList}
										className='flex w-full flex-col gap-3 py-2 pl-8'
									>
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
							</div>
						</li>
					)}

					{currentUser === null && (
						<li className='flex w-full items-center justify-center'>
							<LoginForm
								onSubmit={onSubmit}
								email={email}
								password={password}
								setEmail={setEmail}
								setPassword={setPassword}
							/>
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

					{loading && (
						<li className='flex w-full items-center justify-center'>
							<Loader width={20} border={3} />
						</li>
					)}
				</ul>
			</div>
		</aside>
	);
}
