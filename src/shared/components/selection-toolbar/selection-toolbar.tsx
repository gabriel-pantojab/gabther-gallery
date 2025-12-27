import style from './selection-toolbar.module.css';

type Props = {
	count: number;
	children: React.ReactNode;
	className?: string;
};

export function SelectionToolbar({
	count,
	children,
	className = '',
}: Props): JSX.Element {
	return (
		<div className={style.selectionToolbar}>
			{count > 0 && (
				<div className={`${style.selectionToolbarContent} ${className}`}>
					<p className={style.count}>{count} selected </p>

					<div className={style.tools}>{children}</div>
				</div>
			)}
		</div>
	);
}
