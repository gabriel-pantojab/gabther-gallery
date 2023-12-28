import { Link } from 'react-router-dom';

interface SideBarItemProps {
	children: React.ReactNode;
	path?: string;
	close: () => void;
}

export default function SideBarItem({
	children,
	close,
	path = '',
}: SideBarItemProps): JSX.Element {
	return (
		<li
			className='w-full'
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
