import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import SnoopyLove from '@assets/images/snoopy-love.png';
import Tulipanes from '@assets/images/tulipanes.webp';

export function MyValentin2025(): React.ReactNode {
	const [showMessage, setShowMessage] = useState<boolean>(false);

	const noRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleShowMessage = (): void => {
		setShowMessage(!showMessage);
	};

	const mouseEnter = (): void => {
		if (noRef.current !== null && containerRef.current !== null) {
			const maxWidth = containerRef.current.offsetWidth;
			const maxHeight = containerRef.current.offsetHeight;

			let randomTop = Math.max(
				10,
				Math.floor(Math.random() * (maxWidth - 110)),
			);
			let randomLeft = Math.max(
				10,
				Math.floor(Math.random() * (maxHeight - 60)),
			);

			if (randomTop + 50 >= maxHeight) {
				randomTop = maxHeight - 60;
			}

			if (randomLeft + 100 >= maxWidth) {
				randomLeft = maxWidth - 110;
			}

			noRef.current.style.top = `${randomTop}px`;
			noRef.current.style.left = `${randomLeft}px`;
			noRef.current.style.transform = 'translate(0, 0)';
		}
	};

	const PopupMessage = (): React.ReactNode => {
		return (
			<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
				<article className='flex flex-col gap-4 rounded-md bg-white p-4'>
					<header>
						<h1 className='text-2xl font-bold'>¡Oaaa Pequeñita!</h1>
					</header>

					<section>
						<p>
							Sabia que dirias que si, te amo mucho ❤️ y quiero pasar el resto
							de mi vida contigo. 🌷🥰
						</p>
					</section>

					<footer>
						<button
							className='rounded-md bg-blue-500 p-2 text-white'
							onClick={toggleShowMessage}
						>
							Muchillos
						</button>
					</footer>
				</article>
			</div>
		);
	};

	return (
		<article
			className='bg-[radial-gradient(circle,rgba(158,158,226,1) 21%,rgba(158,207,226,1) 93%)] h-[calc(100dvh)] w-full bg-[rgb(158,158,226)] p-4'
			style={{
				background:
					'radial-gradient(circle, rgba(158,158,226,1) 72%, rgba(158,207,226,1) 93%)',
			}}
		>
			<div
				ref={containerRef}
				className='relative flex h-full flex-col justify-between rounded-md p-4 outline-dashed'
				style={{
					backdropFilter: 'blur(15px)',
					background: 'rgba(255, 255, 255, 0.3)',
				}}
			>
				<section className='flex h-full flex-col items-center justify-center gap-8'>
					<header>
						<h1 className='text-center text-4xl font-bold	'>
							¿Quieres ser mi Valentin?
						</h1>
					</header>

					<img src={SnoopyLove} alt='' />

					<div className='absolute bottom-32 left-8 h-36 w-36'>
						<img className='h-full w-full' src={SnoopyLove} alt='' />
					</div>

					<div className='absolute bottom-32 right-8 h-36 w-36'>
						<img className='h-full w-full' src={SnoopyLove} alt='' />
					</div>

					<div className='absolute left-8 top-8 h-36 w-36'>
						<img className='h-full w-full' src={Tulipanes} alt='' />
					</div>

					<div className='absolute right-8 top-8 h-36 w-36'>
						<img className='h-full w-full' src={Tulipanes} alt='' />
					</div>
				</section>

				<button
					className='absolute bottom-10 h-[50px] w-[100px] rounded-md bg-red-400 font-bold'
					style={{ left: '50%', transform: 'translateX(-150%)' }}
					onMouseEnter={mouseEnter}
					ref={noRef}
				>
					No
				</button>

				<button
					className='absolute bottom-10 h-[50px] w-[100px] rounded-md bg-blue-500 font-bold'
					style={{ left: '50%', transform: 'translateX(50%)' }}
					onClick={toggleShowMessage}
				>
					Si
				</button>

				<p
					className='absolute bottom-4 right-2 font-bold italic'
					style={{
						transform: 'rotate(-25deg)',
					}}
				>
					gabther++
				</p>
			</div>

			{showMessage &&
				containerRef.current !== null &&
				createPortal(<PopupMessage />, containerRef.current)}
		</article>
	);
}
