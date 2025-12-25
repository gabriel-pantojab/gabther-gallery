import { type PostgrestError } from '@supabase/supabase-js';

class SupabaseError extends Error {
	private readonly _code: string;
	private readonly _details: string;
	private readonly _hint: string;

	constructor(error: PostgrestError) {
		super(error.message);
		this.name = 'SupabaseError';
		this._code = error.code;
		this._details = error.details;
		this._hint = error.hint;
	}

	get code(): string {
		return this._code;
	}

	get details(): string {
		return this._details;
	}

	get hint(): string {
		return this._hint;
	}

	get message(): string {
		return super.message;
	}
}

export default SupabaseError;
