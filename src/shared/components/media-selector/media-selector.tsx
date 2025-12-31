import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Photo } from '@/core/types/domain/photo.model';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';

type Render = (media: Photo) => React.ReactNode;

type Props = {
	media: Photo[] | null;
	children: React.ReactNode;
	eventSelectedMedia: (media: Photo[]) => void;
	render: Render;
	close: () => void;
};

export function MediaSelector({
	media,
	children,
	eventSelectedMedia,
	render,
	close,
}: Props): JSX.Element {
	const [selectedMedia, setSelectedMedia] = useState<Map<number, Photo>>(
		new Map(),
	);
	const containerClass =
		'absolute top-0 bottom-0 z-[999999] flex w-full flex-col bg-white';
	const gridClass =
		'relative grid h-full w-full grid-flow-dense auto-rows-[minmax(50px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4';

	useEffect(() => {
		eventSelectedMedia(Array.from(selectedMedia.values()));
	}, [selectedMedia, eventSelectedMedia]);

	const Header = useMemo(
		() => (
			<header className='flex w-full justify-between border-b-2 p-4'>
				<h2>Select Media</h2>

				<button onClick={close}>Close</button>
			</header>
		),
		[close],
	);

	if (media === null) {
		return (
			<section className={containerClass}>
				{Header}
				<section className={gridClass}>
					{new Array(12).fill(0).map((_, index) => {
						return <Skeleton key={index} className='h-full' />;
					})}
				</section>
			</section>
		);
	}

	if (media.length === 0) {
		return (
			<section className={containerClass}>
				{Header}
				<section className={gridClass}>
					<p className='text-center text-gray-500'>No media🤧</p>
				</section>
			</section>
		);
	}

	const handleSelectMedia = (media: Photo) => {
		setSelectedMedia(prev => {
			const next = new Map(prev);
			next.has(media.id) ? next.delete(media.id) : next.set(media.id, media);
			return next;
		});
	};

	return (
		<section className={containerClass}>
			{Header}

			<SelectionToolbar count={selectedMedia.size}>{children}</SelectionToolbar>

			<section className={gridClass}>
				{media.map(photo => (
					<MediaWrapper
						key={photo.id}
						isLoggedIn={true}
						isSelected={selectedMedia.has(photo.id)}
						eventSelectMedia={() => handleSelectMedia(photo)}
					>
						{render(photo)}
					</MediaWrapper>
				))}
			</section>
		</section>
	);
}
