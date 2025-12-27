import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import style from './navigable.module.css';

type Props = {
	enabled?: boolean;
	to?: string;
	children: ReactNode;
};

export function Navigable({
	enabled = true,
	to = '',
	children,
}: Props): JSX.Element {
	if (enabled) {
		return (
			<Link to={to} className={style.navigable}>
				{children}
			</Link>
		);
	}

	return <div className={style.navigable}>{children}</div>;
}
