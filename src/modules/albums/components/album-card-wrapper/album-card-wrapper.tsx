import { Album } from '@/core/types/domain/album.model';
import { MediaWrapper } from '@/shared/components/media-wrapper/media-wrapper';
import { Navigable } from '@/shared/components/navigable/navigable';
import { AlbumCard } from '../album-card/album-card';

type Props = {
	album: Album;
	isLoggedIn: boolean;
	isSelected: boolean;
	eventSelectAlbum: (album: Album) => void;
};

export function AlbumCardWrapper({
	album,
	isLoggedIn,
	isSelected,
	eventSelectAlbum,
}: Props): JSX.Element {
	return (
		<MediaWrapper
			isLoggedIn={isLoggedIn}
			isSelected={isSelected}
			eventSelectMedia={() => eventSelectAlbum(album)}
		>
			<Navigable enabled={!isSelected} to={`/albums/album/${album.id}`}>
				<AlbumCard album={album} />
			</Navigable>
		</MediaWrapper>
	);
}
