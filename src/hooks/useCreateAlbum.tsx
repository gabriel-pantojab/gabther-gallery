import { type FormEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import useAlbum from './useAlbum';

interface TypeReturnHook {
	albumName: string;
	albumCover: File | null;
	urlAlbumCover: string;
	isDragActive: boolean;
	setAlbumName: (value: string) => void;
	setAlbumCover: (value: File | null) => void;
	setUrlAlbumCover: (value: string) => void;
	getRootProps: any;
	getInputProps: any;
	handleCreateAlbum: (event: FormEvent) => Promise<void>;
}

interface TypeProps {
	setOpenModal: (value: boolean) => void;
	parentId?: number | null;
}

export default function useCreateAlbum({
	setOpenModal,
	parentId,
}: TypeProps): TypeReturnHook {
	const { createAlbum } = useAlbum();

	const [albumName, setAlbumName] = useState<string>('');
	const [albumCover, setAlbumCover] = useState<File | null>(null);
	const [urlAlbumCover, setUrlAlbumCover] = useState<string>('');

	const onDrop = (acceptedFiles: File[]): void => {
		const file = acceptedFiles[0];
		const url = window.URL.createObjectURL(file);
		setUrlAlbumCover(url);
		setAlbumCover(file);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleCreateAlbum = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		let idToast;
		try {
			if (albumName === '') throw new Error('Name is required');
			const name = albumName.trim();
			setOpenModal(false);
			idToast = toast.loading('Creating...');
			if (parentId === undefined) parentId = null;
			await createAlbum(name, albumCover, parentId);
			toast.update(idToast, {
				render: 'Created',
				type: 'success',
				isLoading: false,
				autoClose: 2000,
			});
		} catch (error: any) {
			if (idToast !== undefined) {
				toast.update(idToast, {
					render: 'Error, ' + error.message,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
				});
			} else {
				toast.error('Error, ' + error.message, {
					autoClose: 1000,
				});
			}
		}
	};

	return {
		albumName,
		albumCover,
		urlAlbumCover,
		isDragActive,
		setAlbumName,
		setAlbumCover,
		setUrlAlbumCover,
		getRootProps,
		getInputProps,
		handleCreateAlbum,
	};
}
