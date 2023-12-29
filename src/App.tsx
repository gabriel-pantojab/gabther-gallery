import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import SideBar from './components/SideBar';

function App(): JSX.Element {
	const [open, setOpen] = useState(false);

	return (
		<>
			<header className='flex w-full gap-4 border-b-2 p-4'>
				<button
					className='hover:bg-gray-100 lg:hidden'
					onClick={() => {
						setOpen(true);
					}}
				>
					<svg
						className='h-6 w-6'
						aria-hidden='true'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							clipRule='evenodd'
							fillRule='evenodd'
							d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
						></path>
					</svg>
				</button>
				<h1 className='text-2xl font-bold'>Gabther Gallery</h1>
			</header>

			<main className='relative flex w-full flex-col lg:flex-row'>
				<SideBar
					open={open}
					close={() => {
						setOpen(false);
					}}
				/>

				<Outlet />
			</main>

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
}

export default App;
