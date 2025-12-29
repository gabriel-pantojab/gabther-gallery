import { Photo } from '@/core/types/domain/photo.model';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';
import { Navigable } from '@/shared/components/navigable/navigable';
import { MediaCard } from '@/shared/components/media-card/media-card';

type Props = {
	photo: Photo;
	isSelected: boolean;
	isLogged: boolean;
	addSelectedId: (id: number) => void;
	removeSelectedId: (id: number) => void;
};

export function MediaCardWrapper({
	photo,
	isSelected,
	isLogged,
	addSelectedId,
	removeSelectedId,
}: Props): JSX.Element {
	const to: string = `/gallery/media/${photo.id}`;

	const handleToggleSelect = (selectState: boolean) => {
		if (selectState) {
			addSelectedId(photo.id);
			return;
		}
		removeSelectedId(photo.id);
	};

	return (
		<div
			style={{
				animationTimeline: 'view()',
				animationRange: 'entry 20% cover 30%',
			}}
			className='relative animate-reveal transition duration-300 ease-in-out'
		>
			<MediaWrapper
				isLoggedIn={isLogged}
				isSelected={isSelected}
				eventToggleSelect={handleToggleSelect}
			>
				<Navigable enabled={!isSelected} to={to}>
					<MediaCard media={photo} />
				</Navigable>
			</MediaWrapper>
		</div>
	);
}
