import { useContext } from 'react';

import { UserContext } from '../context/userContext';

export default function useAuthGuard(): boolean {
	const { currentUser } = useContext(UserContext);

	return currentUser !== null;
}
