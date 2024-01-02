import ReceivedList from './ReceivedList';

export default function ReceivedLoveNotes(): JSX.Element {
	return (
		<section className='w-full'>
			<header className='flex w-full items-center justify-between p-4'>
				<h2 className='text-2xl font-bold'>Received Love Notes</h2>
			</header>

			<div className='w-full p-4'>
				<ReceivedList />
			</div>
		</section>
	);
}
