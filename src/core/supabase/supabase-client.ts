import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	import.meta.env.VITE_URL_PROYECT,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	import.meta.env.VITE_SUPABASE_KEY,
);

export default supabase;
