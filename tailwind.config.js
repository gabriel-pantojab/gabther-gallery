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
			},
			animation: {
				reveal: 'reveal linear both',
			},
		},
	},
	plugins: [],
};
