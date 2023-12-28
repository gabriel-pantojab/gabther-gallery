import { createContext } from 'react';
import { createClient } from '@supabase/supabase-js';

interface SupabaseContextProps {
	supabase: any;
}

const SupabaseContext = createContext<SupabaseContextProps>({
	supabase: null,
});

const supabase = createClient(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	import.meta.env.VITE_URL_PROYECT,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	import.meta.env.VITE_SUPABASE_KEY,
);

function SupabaseProvider({ children }: any): JSX.Element {
	return (
		<SupabaseContext.Provider value={{ supabase }}>
			{children}
		</SupabaseContext.Provider>
	);
}

export { SupabaseContext };
export default SupabaseProvider;
