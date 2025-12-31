import DefaultAvatar from '@assets/defaul-user.svg';

import style from './user-card.module.css';

type Props = {
	name: string | undefined;
	avatarUrl: string | undefined;
};

export default function UserCard({ avatarUrl, name }: Props): JSX.Element {
	const src = avatarUrl ?? DefaultAvatar;
	const userName = name ?? 'Guest';
	return (
		<div className={style.userCard}>
			<figure className={style.avatarContainer}>
				<img src={src} alt={userName} className={style.avatar} />
			</figure>

			<p>{userName}</p>
		</div>
	);
}
