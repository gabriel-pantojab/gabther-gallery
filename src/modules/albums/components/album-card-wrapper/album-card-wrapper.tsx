import { Album } from '@/core/types/domain/album.model';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';
import { Navigable } from '@/shared/components/navigable/navigable';
import { AlbumCard } from '../album-card/album-card';

type Props = {
	album: Album;
	isLoggedIn: boolean;
	isSelected: boolean;
	addSelectedId: (id: number) => void;
	removeSelectedId: (id: number) => void;
};

export function AlbumCardWrapper({
	album,
	isLoggedIn,
	isSelected,
	addSelectedId,
	removeSelectedId,
}: Props): JSX.Element {
	const handleToggleSelect = (selectState: boolean) => {
		if (selectState) {
			addSelectedId(album.id);
			return;
		}
		removeSelectedId(album.id);
	};

	return (
		<MediaWrapper
			isLoggedIn={isLoggedIn}
			isSelected={isSelected}
			eventToggleSelect={handleToggleSelect}
		>
			<Navigable
				enabled={!isSelected}
				to={`/albums/album/${album.name}-${album.id}`}
			>
				<AlbumCard album={album} />
			</Navigable>
		</MediaWrapper>
	);
}
