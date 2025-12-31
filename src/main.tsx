import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import UserProvider from './context/userContext';
import AppRoot from './app-root';
import { router } from './routes/router';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<AppRoot>
				<RouterProvider router={router} />
			</AppRoot>
		</UserProvider>
	</React.StrictMode>,
);
