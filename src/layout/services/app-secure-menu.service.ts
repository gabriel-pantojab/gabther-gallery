import { MenuItem } from '@/core/types/domain/menu-item';

export class AppSecureMenuService {
	static #instance: AppSecureMenuService;

	private constructor() {}

	public static getInstance(): AppSecureMenuService {
		if (!AppSecureMenuService.#instance) {
			AppSecureMenuService.#instance = new AppSecureMenuService();
		}
		return AppSecureMenuService.#instance;
	}

	public getItems(): MenuItem[] {
		return [
			{
				label: 'Cartas',
				icon: 'mail',
				items: [
					{
						label: 'Enviadas',
						path: '/secure/love-notes/sends',
					},
					{
						label: 'Recibidas',
						path: '/secure/love-notes/received',
					},
					{
						label: 'Special Notes',
						path: '/secure/special-notes',
					},
				],
			},
		];
	}
}
