import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { router } from './routes/router';
import SupabaseProvider from './context/supabaseContext';
import UserProvider from './context/userContext';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SupabaseProvider>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</SupabaseProvider>
		,
	</React.StrictMode>,
);
