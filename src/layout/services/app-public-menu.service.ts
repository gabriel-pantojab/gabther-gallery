import { MenuItem } from '@/core/types/domain/menu-item';

export class AppPublicMenuService {
	static #instance: AppPublicMenuService;

	private constructor() {}

	public static getInstance(): AppPublicMenuService {
		if (!AppPublicMenuService.#instance) {
			AppPublicMenuService.#instance = new AppPublicMenuService();
		}
		return AppPublicMenuService.#instance;
	}

	public getItems(): MenuItem[] {
		return [
			{
				label: 'Gallery',
				icon: 'photo',
				path: '/gallery',
			},
			{
				label: 'Albums',
				icon: 'album',
				path: '/albums',
			},
			{
				label: 'Favorites',
				icon: 'favorite',
				path: '/gallery/favorites',
			},
		];
	}
}
