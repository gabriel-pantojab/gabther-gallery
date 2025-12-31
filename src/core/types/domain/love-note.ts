import { LoveNoteState } from './enum/love-note-state';

export interface LoveNote {
	id: number;
	title: string;
	message: string;
	templateUrl: string;
	url: string;
	state: LoveNoteState;
	author: string;
	emailAuthor: string;
	recipient: string;
	emailRecipient: string;
	createdAt: string;
}
