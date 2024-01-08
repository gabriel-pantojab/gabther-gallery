interface LoginFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	email: string;
	password: string;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
}

export default function LoginForm({
	email,
	password,
	setEmail,
	setPassword,
	onSubmit,
}: LoginFormProps): JSX.Element {
	return (
		<form
			className='flex w-full flex-col gap-4'
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onSubmit={onSubmit}
		>
			<label htmlFor='email' className='flex w-full flex-col'>
				<input
					type='text'
					id='email'
					name='email'
					placeholder='Email'
					value={email}
					onChange={e => {
						setEmail(e.target.value);
					}}
					className='border-b-2 border-[#CDB0EE] bg-transparent p-1 pl-2 focus:outline-none'
				/>
			</label>

			<label htmlFor='password' className='flex w-full flex-col'>
				<input
					type='password'
					id='password'
					name='password'
					placeholder='Password'
					value={password}
					onChange={e => {
						setPassword(e.target.value);
					}}
					className='border-b-2 border-[#CDB0EE] bg-transparent p-1 pl-2 focus:outline-none'
				/>
			</label>

			<div className='flex w-full gap-4'>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-blue-500 text-white'
				>
					SignIn
				</button>
			</div>
		</form>
	);
}
