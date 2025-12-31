import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './sidebar-item.module.css';
import { MenuItem } from '@/core/types/domain/menu-item';
import { Icon } from '@/shared/components/icons/icon';

type Props = {
	item: MenuItem;
	style?: CSSProperties;
	action?: () => void;
};

export function SidebarItem({ item, style = {}, action }: Props): JSX.Element {
	const navigate = useNavigate();
	const [openSubItems, setOpenSubItems] = useState<boolean>(true);

	const handleToggleSubItems = () => {
		if (item.items) {
			setOpenSubItems(prev => !prev);
		}
	};

	const goTo = () => {
		if (action) action();
		if (item.path) navigate(item.path);
	};

	return (
		<li style={style} className={`${styles.sidebarItem}`} onClick={goTo}>
			<div className={styles.sidebarContent} onClick={handleToggleSubItems}>
				<Icon icon={item.icon ?? ''} />

				<span>{item.label}</span>
			</div>

			{!!item.items && (
				<details open={openSubItems}>
					<summary></summary>

					<ul className={styles.subItemsContent}>
						{item.items?.map(subItem => (
							<SidebarItem key={subItem.label} item={subItem} />
						))}
					</ul>
				</details>
			)}
		</li>
	);
}
