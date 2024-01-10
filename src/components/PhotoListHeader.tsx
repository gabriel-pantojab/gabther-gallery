import { useContext } from 'react';

import { UserContext } from '../context/userContext';
import UploadPhoto from './UploadPhoto';

export default function PhotoListHeader(): JSX.Element {
	const { currentUser } = useContext(UserContext);
	return (
		<header className='flex w-full items-center justify-between p-4 pb-4'>
			<h2 className='text-2xl font-bold'>Photos</h2>

			{currentUser !== null && <UploadPhoto />}
		</header>
	);
}
