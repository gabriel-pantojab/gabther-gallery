import FavoriteList from '../components/favorites/FavoriteList';

export default function FavoriteListPage(): JSX.Element {
	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between p-4 pb-4'>
				<h2 className='text-2xl font-bold'>Favorite Photos</h2>
			</header>

			<FavoriteList />
		</section>
	);
}
