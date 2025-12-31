import { useContext, useRef } from 'react';
import { UserContext } from '@/context/userContext';
import UserCard from '@/shared/components/user-card/user-card';
import { useAppPublicMenu } from '@/layout/hooks/use-app-public-menu';
import { useAppSecureMenu } from '@/layout/hooks/use-app-secure-menu';
import LoginForm from '@/components/LoginForm';
import useLogin from '@/hooks/useLogin';
import Loader from '@/components/Loader';
import { useSidebar } from '@/layout/hooks/use-sidebar';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { SidebarItem } from './sidebar-item/sidebar-item';
import style from './sidebar.module.css';

export function Sidebar(): JSX.Element {
	const { isOpenSidebar, closeSidebar, isMobile } = useSidebar();
	const { currentUser, signOut } = useContext(UserContext);
	const { items: publicItems } = useAppPublicMenu();
	const { items: secureItems } = useAppSecureMenu();

	// TODO: replace this logic
	const { email, password, loading, setEmail, setPassword, login } = useLogin();
	const sidebarRef = useRef(null);
	useOnClickOutside(sidebarRef, () => {
		if (isMobile()) {
			closeSidebar();
		}
	});
	const onSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		await login();
	};

	return (
		<aside
			ref={sidebarRef}
			className={`${isOpenSidebar ? style.open : ''} ${style.sidebar}`}
		>
			<div className={style.sidebarContent}>
				{currentUser !== null && (
					<UserCard
						name={currentUser.name}
						avatarUrl={currentUser.avatar_url}
					/>
				)}

				<ul className={style.itemsContainer}>
					{publicItems.map((item, index) => (
						<SidebarItem key={index} item={item} action={closeSidebar} />
					))}

					{secureItems.map((item, index) => (
						<SidebarItem key={index} item={item} action={closeSidebar} />
					))}
				</ul>

				{currentUser === null && (
					<div className='flex w-full items-center justify-center'>
						<LoginForm
							onSubmit={onSubmit}
							email={email}
							password={password}
							setEmail={setEmail}
							setPassword={setPassword}
						/>
					</div>
				)}

				<div className='w-full'>
					<button
						onClick={() => {
							signOut().then();
						}}
						className='flex w-full justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700'
					>
						SignOut
					</button>
				</div>

				{loading && (
					<div className='flex w-full items-center justify-center'>
						<Loader width={20} border={3} />
					</div>
				)}
			</div>
		</aside>
	);
}
