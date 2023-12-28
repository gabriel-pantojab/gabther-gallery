interface SideBarItemProps {
	children: React.ReactNode;
	path?: string;
}

export default function SideBarItem({
	children,
	path = '',
}: SideBarItemProps): JSX.Element {
	return (
		<li className='w-full'>
			<a href={path} className='flex w-full items-center gap-4'>
				{children}
			</a>
		</li>
	);
}
