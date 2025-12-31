import { LoveNoteState } from '../../domain/enum/love-note-state';

export interface LoveNoteResponse {
	id: number;
	title: string;
	message: string;
	template: string;
	url_love_note: string;
	state: LoveNoteState;
	author: string;
	email_author: string;
	recipient: string;
	email_recipient: string;
	created_at: string;
}
