export interface LoveNote {
	id: number;
	author: string;
	recipient: string;
	template: string;
	title: string;
	message: string;
	email_recipient: string;
	email_author: string;
	created_at: string;
	url_love_note: string;
	state: StateLoveNote;
}

export enum StateLoveNote {
	SENT = 'SENT',
	READ = 'READ',
}
