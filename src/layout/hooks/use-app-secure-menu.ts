import { MenuItem } from '@/core/types/domain/menu-item';
import { useContext, useEffect, useState } from 'react';
import { AppSecureMenuService } from '../services/app-secure-menu.service';
import { UserContext } from '@/context/userContext';

type Return = {
	items: MenuItem[];
};

export function useAppSecureMenu(): Return {
	const { currentUser } = useContext(UserContext);
	const [items, setItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		if (currentUser !== null) {
			setItems(AppSecureMenuService.getInstance().getItems());
		} else {
			setItems([]);
		}
	}, [currentUser]);

	return { items };
}
