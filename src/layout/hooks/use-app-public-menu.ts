import { useEffect, useState } from 'react';
import { AppPublicMenuService } from '../services/app-public-menu.service';
import { MenuItem } from '@/core/types/domain/menu-item';

type Return = {
	items: MenuItem[];
};

export function useAppPublicMenu(): Return {
	const [items, setItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		setItems(AppPublicMenuService.getInstance().getItems());
	}, []);

	return { items };
}
