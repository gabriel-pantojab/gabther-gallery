import { createContext, useContext, useEffect, useState } from 'react';

import { type User } from '../models/user.interface';
import { SupabaseContext } from './supabaseContext';

interface UserContextProps {
	currentUser: User | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
	currentUser: null,
	setCurrentUser: () => {},
	signInWithGoogle: async () => {},
	signOut: async () => {},
});

function UserProvider({ children }: any): JSX.Element {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const { supabase } = useContext(SupabaseContext);

	const signInWithGoogle = async (): Promise<void> => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: 'google',
			});

			if (error !== null) {
				throw error;
			}
		} catch (error) {}
	};

	const signOut = async (): Promise<void> => {
		try {
			await supabase.auth.signOut();
			setCurrentUser(null);
		} catch (error) {}
	};

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_: any, session: any) => {
			if (session !== null) {
				const {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					user: { email, id, created_at, user_metadata },
				} = session;
				setCurrentUser({
					email,
					created_at,
					name: user_metadata.name,
					avatar_url: user_metadata.avatar_url,
					id,
				});
			} else {
				setCurrentUser(null);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, signInWithGoogle, signOut }}
		>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext };
export default UserProvider;
