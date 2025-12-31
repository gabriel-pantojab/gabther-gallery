import { useEffect } from 'react';
import { LoveNoteEventsService } from '@/core/service/events/love-note-events.service';
import { LoveNoteResponse } from '@/core/types/dto/response/love-note.response';
import { LoveNoteMapper } from '@/core/mappers/love-note.mapper';
import { LoveNote } from '@/core/types/domain/love-note';

export function useReceivedLoveNotesEvent(handle: (payload: LoveNote) => void) {
	useEffect(() => {
		const channel = LoveNoteEventsService.getInstance()
			.onInsert('RECEIVED_LOVE_NOTE', (payload: LoveNoteResponse) =>
				handle(LoveNoteMapper.single(payload)),
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, []);
}
