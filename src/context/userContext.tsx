import { createContext, useContext, useEffect, useState } from 'react';

import { type User } from '../models/user.interface';
import { SupabaseContext } from './supabaseContext';

interface UserContextProps {
	currentUser: User | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
	signInWithGoogle: () => Promise<void>;
	signInWithEmailAndPassword: (
		email: string,
		password: string,
	) => Promise<void>;
	signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
	currentUser: null,
	setCurrentUser: () => {},
	signInWithGoogle: async () => {},
	signInWithEmailAndPassword: async () => {},
	signOut: async () => {},
});

function UserProvider({ children }: any): JSX.Element {
	const [currentUser, setCurrentUser] = useState<User | null>(() => {
		const user = localStorage.getItem('user');
		if (user !== null) {
			const u = JSON.parse(user) as User;
			return u;
		}
		return null;
	});
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

	const signInWithEmailAndPassword = async (
		email: string,
		password: string,
	): Promise<void> => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error !== null) {
			throw error;
		}
	};

	const signOut = async (): Promise<void> => {
		try {
			await supabase.auth.signOut();
		} catch (error) {}
	};

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_: any, session: any) => {
			if (session !== null && currentUser === null) {
				const {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					user: { email, id, created_at, user_metadata },
				} = session;

				localStorage.setItem(
					'user',
					JSON.stringify({
						email,
						created_at,
						name: user_metadata.name,
						avatar_url: user_metadata.avatar_url,
						id,
					}),
				);

				setCurrentUser({
					email,
					created_at,
					name: user_metadata.name,
					avatar_url: user_metadata.avatar_url,
					id,
				});
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				signInWithGoogle,
				signOut,
				signInWithEmailAndPassword,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext };
export default UserProvider;
