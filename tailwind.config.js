/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				reveal: {
					from: { opacity: 0, translate: '0 100px' },
					to: { opacity: 1, translate: '0 0' },
				},

				pulsar: {
					'0% 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
				},

				loader: { to: { transform: 'rotate(1turn)' } },
			},
			animation: {
				reveal: 'reveal linear both',
				pulsar: 'pulsar 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				loader: 'loader 1s infinite linear',
			},
		},
	},
	plugins: [],
};
