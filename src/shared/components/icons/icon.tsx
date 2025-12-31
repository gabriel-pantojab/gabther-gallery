import AlbumIcon from '@/components/icons/AlbumIcon';
import FavoriteIcon from '@/components/icons/FavoriteIcon';
import MailIcon from '@/components/icons/MailIcon';
import PhotoIcon from '@/components/icons/PhotoIcon';

type Props = { icon: string };
const icons = new Map([
	['photo', PhotoIcon],
	['album', AlbumIcon],
	['favorite', FavoriteIcon],
	['mail', MailIcon],
]);

export function Icon({ icon }: Props): JSX.Element | null {
	const Icon = icons.get(icon);
	if (Icon) return <Icon />;
	return null;
}
