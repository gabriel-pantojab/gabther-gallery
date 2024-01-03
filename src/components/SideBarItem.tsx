import { Link } from 'react-router-dom';

interface SideBarItemProps {
	children: React.ReactNode;
	path?: string;
	close: () => void;
	className?: string;
}

export default function SideBarItem({
	children,
	close,
	path = '',
	className = '',
}: SideBarItemProps): JSX.Element {
	return (
		<li
			className={`w-full ${className}`}
			onClick={() => {
				close();
			}}
		>
			<Link to={path} className='flex w-full items-center gap-4'>
				{children}
			</Link>
		</li>
	);
}
