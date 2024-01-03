import { type UploadIconProps } from './icon.interface';

export default function CheckIcon2({
	className = '',
	width = 24,
	height = 24,
	color = 'currentColor',
}: UploadIconProps): JSX.Element {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			strokeWidth='2'
			stroke={color}
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />

			<path d='M5 12l5 5l10 -10' />
		</svg>
	);
}