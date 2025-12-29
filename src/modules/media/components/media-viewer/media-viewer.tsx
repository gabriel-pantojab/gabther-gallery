import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import { Photo } from '@/core/types/domain/photo.model';
import { ToastService } from '@/core/service/toast.service';
import { MediaCard } from '@/shared/components/media-card/media-card';
import { formatDate } from '@/utils/date';
import { MediaHeader } from '../media-header/media-header';

type Props = {
	isFavorite: boolean;
	isLoggedIn: boolean;
	media: Photo | null;
	toggleFavorite: () => void;
	deleteMedia: () => void;
};

export function MediaViewer({
	isFavorite,
	isLoggedIn,
	media,
	toggleFavorite,
	deleteMedia,
}: Props): JSX.Element {
	const navigation = useNavigate();

	const goBack = () => {
		navigation(-1);
	};

	const handleDeleteMedia = (): void => {
		if (!isLoggedIn) return;
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to recover this photo!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		})
			.then(async result => {
				if (result.isConfirmed) {
					deleteMedia();
					goBack();
				}
			})
			.catch((error: any) => {
				ToastService.getInstance().error(error.message);
			});
	};

	// TODO: add suport for video

	return (
		<section className='flex w-full flex-col items-center gap-4 p-4'>
			<MediaHeader
				isFavorite={isFavorite}
				isLoggedIn={isLoggedIn}
				toggleFavorite={toggleFavorite}
				deleteMedia={handleDeleteMedia}
			/>

			<figure className='max-w-fit overflow-hidden rounded-md lg:max-h-screen'>
				{media === null ? (
					<Skeleton height={500} width={500} />
				) : (
					<MediaCard media={media} />
				)}
			</figure>

			<div className='flex w-full'>
				<p>Date: {media?.createdAt != null && formatDate(media?.createdAt)}</p>
			</div>
		</section>
	);
}
