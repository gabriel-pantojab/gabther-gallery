import { Id as ToastId, toast } from 'react-toastify';

export class ToastService {
	static #instance: ToastService;

	private constructor() {}

	public static getInstance(): ToastService {
		if (!ToastService.#instance) {
			ToastService.#instance = new ToastService();
		}
		return ToastService.#instance;
	}

	public success(message: string, toastId?: ToastId): void {
		if (toastId) {
			toast.update(toastId, {
				render: message,
				type: 'success',
				isLoading: false,
				autoClose: 3000,
			});
		} else {
			toast.success(message, { autoClose: 3000 });
		}
	}

	public error(message: string, toastId?: ToastId): void {
		if (toastId) {
			toast.update(toastId, {
				render: message,
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			});
		} else {
			toast.error(message, { autoClose: 3000 });
		}
	}

	public loading(message: string): ToastId {
		return toast.loading(message);
	}
}
