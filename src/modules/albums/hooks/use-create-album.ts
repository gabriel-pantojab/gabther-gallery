import { FormEvent, useState } from 'react';
import { ToastService } from '@/core/service/toast.service';
import { useAlbum } from './use-album';

type Props = {
	parentId?: number | null;
	close: () => void;
};

type CreateForm = {
	name: string;
	cover: File | null;
	coverUrl: string;
};

export function useCreateAlbum({ parentId, close }: Props) {
	const { createAlbum } = useAlbum();
	const [form, setForm] = useState<CreateForm>({
		name: '',
		cover: null,
		coverUrl: '',
	});

	const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const updateForm = (updates: Partial<CreateForm>) => {
		setForm(prev => ({ ...prev, ...updates }));
	};

	const onDrop = (acceptedFiles: File[]): void => {
		const file = acceptedFiles[0];
		const url = window.URL.createObjectURL(file);
		setForm(prev => ({ ...prev, cover: file, coverUrl: url }));
	};

	const handleCreateAlbum = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		let idToast = ToastService.getInstance().loading('Creating...');
		try {
			if (form.name === '') throw new Error('Name is required');
			const name = form.name.trim();
			close();
			if (parentId === undefined) parentId = null;
			await createAlbum(name, form.cover, parentId);
			ToastService.getInstance().success('Created', idToast);
		} catch (error: any) {
			ToastService.getInstance().error(error.message, idToast);
		}
	};

	return {
		formData: form,
		onDrop,
		changeForm,
		updateForm,
		handleCreateAlbum,
	};
}
