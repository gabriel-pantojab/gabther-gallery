const style = {
	borderRadius: '50%',
	border: '2px solid #25b09b',
	borderBottomColor: 'transparent',
};

export default function Loader({
	width,
	border,
}: {
	width: number;
	border: number;
}): JSX.Element {
	return (
		<div
			style={{
				width,
				height: width,
				...style,
				borderWidth: border,
			}}
			className='animate-loader'
		></div>
	);
}
