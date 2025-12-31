import { LoveNote } from '../types/domain/love-note';
import { LoveNoteResponse } from '../types/dto/response/love-note.response';

function single(loveNoteResponse: LoveNoteResponse): LoveNote {
	return {
		id: loveNoteResponse.id,
		title: loveNoteResponse.title,
		message: loveNoteResponse.message,
		url: loveNoteResponse.url_love_note,
		templateUrl: loveNoteResponse.template,
		state: loveNoteResponse.state,
		author: loveNoteResponse.author,
		emailAuthor: loveNoteResponse.email_author,
		recipient: loveNoteResponse.recipient,
		emailRecipient: loveNoteResponse.email_recipient,
		createdAt: loveNoteResponse.created_at,
	};
}

function many(loveNotes: LoveNoteResponse[]): LoveNote[] {
	return loveNotes.map((loveNoteResponse: LoveNoteResponse) =>
		single(loveNoteResponse),
	);
}

export const LoveNoteMapper = {
	single,
	many,
};
