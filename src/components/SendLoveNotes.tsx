import { Link } from 'react-router-dom';

import SendList from './SendList';

export default function SendLoveNotes(): JSX.Element {
	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between p-4'>
				<h2 className='text-2xl font-bold'>Send Love Notes</h2>

				<Link
					to={`/love-notes/sends/send`}
					className='flex justify-center rounded-md bg-blue-500 px-2 py-1 text-sm text-white active:bg-blue-600'
				>
					New 💖
				</Link>
			</header>

			<div className='w-full p-4'>
				<SendList />
			</div>
		</section>
	);
}
