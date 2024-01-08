import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { UserContext } from '../context/userContext';

interface TypeReturnHook {
	email: string;
	setEmail: (email: string) => void;
	password: string;
	setPassword: (password: string) => void;
	login: () => Promise<void>;
	loading: boolean;
}

export default function useLogin(): TypeReturnHook {
	const { signInWithEmailAndPassword } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const login = async (): Promise<void> => {
		try {
			if (email !== '' && password !== '') {
				setLoading(true);
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
		} finally {
			setLoading(false);
		}
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		login,
		loading,
	};
}
