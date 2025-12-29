import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Photo } from '@/core/types/domain/photo.model';
import { SelectionToolbar } from '@/shared/components/selection-toolbar/selection-toolbar';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';

type Render = (media: Photo) => React.ReactNode;

type Props = {
	media: Photo[] | null;
	children: React.ReactNode;
	eventSelectedIds: (ids: number[]) => void;
	render: Render;
	close: () => void;
};

export function MediaSelector({
	media,
	children,
	eventSelectedIds,
	render,
	close,
}: Props): JSX.Element {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
	const gridClass = `relative grid h-full min-h-screen w-full grid-flow-dense auto-rows-[minmax(100px,auto)] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4`;

	useEffect(() => {
		eventSelectedIds(Array.from(selectedIds));
	}, [selectedIds, eventSelectedIds]);

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
			<section className='absolute left-0 top-0 z-[999999] flex min-h-screen w-full flex-col bg-white'>
				{Header}
				<section className={gridClass}>
					{new Array(12).fill(0).map((_, index) => {
						return <Skeleton key={index} height={200} />;
					})}
				</section>
			</section>
		);
	}

	if (media.length === 0) {
		return (
			<section className={gridClass}>
				<p className='text-center text-gray-500'>No albums 🤧</p>
			</section>
		);
	}

	const handleToggleSelect = (id: number, isSelected: boolean) => {
		setSelectedIds(prev => {
			const next = new Set(prev);
			isSelected ? next.add(id) : next.delete(id);
			return next;
		});
	};

	return (
		<section className='absolute left-0 top-0 z-[999999] flex min-h-screen w-full flex-col bg-white'>
			{Header}

			<SelectionToolbar count={selectedIds.size}>{children}</SelectionToolbar>

			<section className={gridClass}>
				{media.map(photo => (
					<MediaWrapper
						key={photo.id}
						isLoggedIn={true}
						isSelected={selectedIds.has(photo.id)}
						eventToggleSelect={isSelected =>
							handleToggleSelect(photo.id, isSelected)
						}
					>
						{render(photo)}
					</MediaWrapper>
				))}
			</section>
		</section>
	);
}
