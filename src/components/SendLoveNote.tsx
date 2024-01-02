import {
	type FormEvent,
	useContext,
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';
import { getTemplates, sendLoveNote } from '../utils/supabase';
import BackIcon from './icons/BackIcon';
import { type Template } from '../models/template.interface';
import TrashIcon from './icons/TrashIcon';

interface Users {
	id: string;
	email: string;
}

export default function SendLoveNote(): JSX.Element {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);

	const navigate = useNavigate();

	const [recipientId, setRecipientId] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [title, setTitle] = useState<string>('');

	const [idUsers, setIdUsers] = useState<Users[]>([]);

	const [templates, setTemplates] = useState<Template[]>([]);
	const [urlTemplate, setUrlTemplate] = useState<string>('');

	const textArea = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLLabelElement>(null);
	const container = useRef<HTMLDivElement>(null);
	const [oldWidthContainer, setOldWidthContainer] = useState<number>(0);
	const [oldHeightContainer, setOldHeightContainer] = useState<number>(0);
	const [currentElement, setCurrentElement] = useState<HTMLElement | null>(
		null,
	);
	const [move, setMove] = useState<boolean>(false);
	const [deltaX, setDeltaX] = useState<number>(0);
	const [deltaY, setDeltaY] = useState<number>(0);

	const moveElement = (clientX: number, clientY: number): void => {
		if (move && currentElement !== null && container.current !== null) {
			const { left, top } = container.current.getBoundingClientRect();
			const x = clientX - deltaX - left;
			const y = clientY - deltaY - top;
			currentElement.style.left = `${x}px`;
			currentElement.style.top = `${y}px`;
		}
	};

	const enter = (
		xTL: number,
		yTL: number,
		xBR: number,
		yBR: number,
		x: number,
		y: number,
	): boolean => {
		return xTL + 20 <= x && xBR - 20 >= x && yTL + 20 <= y && yBR - 20 >= y;
	};

	const calculateDelta = (
		clientX: number,
		clientY: number,
		element: HTMLElement,
	): void => {
		const { left, top, bottom, right } = element.getBoundingClientRect();
		const bb = enter(left, top, right, bottom, clientX, clientY);
		if (bb) {
			const root = document.getElementById('root');
			document.body.style.overflow = 'hidden';
			if (root !== null) {
				root.style.overflow = 'hidden';
			}
			setCurrentElement(element);
			setMove(true);
			const dX = clientX - left;
			const dY = clientY - top;
			setDeltaX(dX);
			setDeltaY(dY);
		}
	};

	const onSubmit = (event: FormEvent): void => {
		event.preventDefault();
		if (currentUser === null) return;
		if (message === '' || title === '') {
			toast.error('Message and title are required', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
			});
			return;
		}
		const emailReceived = idUsers.find((u: Users) => u.id === recipientId);

		if (emailReceived === undefined) return;

		sendLoveNote(
			{
				author: currentUser.id,
				email_author: currentUser.email,
				email_recipient: emailReceived.email,
				recipient: recipientId,
				title,
				message,
				template: urlTemplate,
			},
			supabase,
		)
			.then(() => {
				setMessage('');
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (currentUser === null) return;
		supabase
			.from('user')
			.select('*')
			.neq('id', currentUser?.id)
			.then(({ data, error }: { data: any; error: any }) => {
				if (error !== null) {
					throw error;
				}

				if (data !== null) {
					const ids: Users[] = data.map((user: any) => {
						return { id: user.id as string, email: user.email as string };
					});
					setRecipientId(ids[0].id);
					setIdUsers(ids);
				}
			});
	}, [currentUser]);

	useEffect(() => {
		getTemplates(supabase)
			.then(data => {
				setTemplates(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const handleResize = useCallback((): void => {
		let widthContainer: number, heightContainer: number;
		let xT, yT, xI, yI: number;

		if (window.matchMedia('(max-width: 320px)').matches) {
			widthContainer = 290;
			heightContainer = 400;
		} else {
			widthContainer = 600;
			heightContainer = 700;
		}

		if (
			textArea.current !== null &&
			titleRef.current !== null &&
			widthContainer !== undefined
		) {
			xT =
				Number(textArea.current?.style.left.split('px')[0]) *
				(widthContainer / oldWidthContainer);
			yT =
				Number(textArea.current?.style.top.split('px')[0]) *
				(heightContainer / oldHeightContainer);

			textArea.current.style.left = `${xT}px`;
			textArea.current.style.top = `${yT}px`;

			xI =
				Number(titleRef.current?.style.left.split('px')[0]) *
				(widthContainer / oldWidthContainer);
			yI =
				Number(titleRef.current?.style.top.split('px')[0]) *
				(heightContainer / oldHeightContainer);

			titleRef.current.style.left = `${xI}px`;
			titleRef.current.style.top = `${yI}px`;
		}

		setOldWidthContainer(prevWidth => {
			return prevWidth !== widthContainer ? widthContainer : prevWidth;
		});
		setOldHeightContainer(prevHeight => {
			return prevHeight !== heightContainer ? heightContainer : prevHeight;
		});
	}, [oldWidthContainer, oldHeightContainer]);

	useEffect(() => {
		if (window.innerWidth === 320) {
			setOldWidthContainer(290);
			setOldHeightContainer(400);
		} else {
			setOldWidthContainer(600);
			setOldHeightContainer(700);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	return (
		<section className='w-full'>
			<div className='flex w-full justify-between p-4'>
				<h3>SendLoveNote</h3>

				<button
					onClick={() => {
						navigate('/love-notes/sends');
					}}
				>
					<BackIcon />
				</button>
			</div>

			<div className='flex w-full flex-col p-4'>
				<form
					onSubmit={onSubmit}
					className='m-auto flex h-full w-full max-w-[600px] flex-col items-center gap-4'
				>
					<label htmlFor='users' className='w-full px-4'>
						To:{' '}
						<select
							name='users'
							id='users'
							value={recipientId}
							onChange={e => {
								setRecipientId(e.target.value);
							}}
							className='min-w-[200px] rounded-md border-2 outline-none focus:outline-none active:outline-none'
						>
							{idUsers.map((u: Users, index) => (
								<option key={u.id} value={u.id} defaultChecked={index === 0}>
									{u.email}
								</option>
							))}
						</select>
					</label>

					{urlTemplate !== '' && (
						<div className='flex w-full'>
							<button
								onClick={() => {
									setUrlTemplate('');
								}}
								className='text-red-500'
							>
								<TrashIcon width={16} height={16} />
							</button>
						</div>
					)}

					<div
						ref={container}
						onMouseUp={() => {
							setMove(false);
						}}
						onTouchEnd={() => {
							setMove(false);
							const root = document.getElementById('root');
							document.body.style.overflow = 'auto';
							if (root !== null) {
								root.style.overflow = 'auto';
							}
						}}
						onMouseMove={e => {
							const { clientX, clientY } = e;
							moveElement(clientX, clientY);
						}}
						onTouchMove={e => {
							const { clientX, clientY } = e.touches[0];
							moveElement(clientX, clientY);
						}}
						style={{
							backgroundImage: `url(${urlTemplate})`,
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
						className='relative flex h-[400px] w-[290px] flex-col border-2 bg-contain md:h-[700px] md:w-[600px]'
					>
						<label
							ref={titleRef}
							id='titleLabel'
							htmlFor='title'
							className='absolute left-[29px] top-[35px] w-10/12 max-w-[550px]'
							onMouseDown={e => {
								const { clientX, clientY } = e;
								if (titleRef.current !== null) {
									const element = titleRef.current;
									calculateDelta(clientX, clientY, element);
								}
							}}
							onTouchStart={e => {
								const { clientX, clientY } = e.touches[0];
								if (titleRef.current !== null) {
									const element = titleRef.current;
									calculateDelta(clientX, clientY, element);
								}
							}}
						>
							<textarea
								id='title'
								name='title'
								placeholder='Title'
								rows={1}
								cols={30}
								value={title}
								onChange={e => {
									setTitle(e.target.value);
								}}
								className='w-full cursor-pointer resize overflow-hidden rounded-md border-2 bg-transparent p-3 outline-none focus:outline-none active:outline-none'
							></textarea>
						</label>

						<div
							id='textAreaContainer'
							ref={textArea}
							onMouseDown={e => {
								const { clientX, clientY } = e;
								if (textArea.current !== null) {
									const element = textArea.current;
									calculateDelta(clientX, clientY, element);
								}
							}}
							onTouchStart={e => {
								const { clientX, clientY } = e.touches[0];
								if (textArea.current !== null) {
									const element = textArea.current;
									calculateDelta(clientX, clientY, element);
								}
							}}
							className='absolute left-[29px] top-[105px] w-10/12 max-w-[550px]'
						>
							<textarea
								name='message'
								id='message'
								cols={30}
								rows={10}
								placeholder='Message'
								value={message}
								onChange={e => {
									setMessage(e.target.value);
								}}
								className='h-full w-full cursor-pointer resize rounded-md border-2 bg-transparent p-2 outline-none focus:outline-none active:outline-none'
							></textarea>
						</div>
					</div>

					<button
						type='submit'
						className='m-auto flex w-full max-w-[200px] justify-center rounded-md bg-blue-500 py-1 text-white'
					>
						Send
					</button>
				</form>

				<div
					style={{
						display: 'flex',
						overflow: 'auto',
						scrollSnapType: 'x mandatory',
						gap: '1rem',
						padding: '1rem',
					}}
				>
					{templates.map((template: Template) => {
						return (
							<figure
								onClick={() => {
									setUrlTemplate(template.url_image);
								}}
								key={template.id}
								style={{
									scrollSnapAlign: 'start',
									minWidth: '200px',
								}}
								className='max-h-[300px] max-w-[200px] cursor-pointer border-2'
							>
								<img
									src={template.url_image}
									alt={`tempalte ${template.id}`}
									className='h-full w-full object-cover'
								/>
							</figure>
						);
					})}
				</div>
			</div>
		</section>
	);
}
