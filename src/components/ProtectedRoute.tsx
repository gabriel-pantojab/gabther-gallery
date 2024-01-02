import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { type GuardFunction } from '../guards/guard.model';

interface ProtectedRouteProps {
	children: React.ReactNode;
	guard: GuardFunction;
	redirect: string;
}

export default function ProtectedRoute({
	guard,
	children,
	redirect,
}: ProtectedRouteProps): JSX.Element {
	const isAuthorized: boolean = guard();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthorized) navigate(redirect);
	}, [isAuthorized]);

	return <>{isAuthorized && children}</>;
}
