interface UserProps {
	avatarUrl: string | undefined;
	name: string | undefined;
}

export default function User({ avatarUrl, name }: UserProps): JSX.Element {
	return (
		<div className='mb-4 flex w-full flex-col items-center justify-center'>
			<figure className='max-h-[90px] max-w-[90px] overflow-hidden rounded-full'>
				<img src={avatarUrl} alt={name} />
			</figure>

			{name !== undefined && <p>{name}</p>}
		</div>
	);
}
