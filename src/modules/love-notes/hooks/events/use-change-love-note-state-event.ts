import { LoveNoteEventsService } from '@/core/service/events/love-note-events.service';
import { LoveNoteResponse } from '@/core/types/dto/response/love-note.response';
import { useEffect } from 'react';

export function useChangeLoveNoteStateEvent(
	handle: (payload: LoveNoteResponse) => void,
) {
	useEffect(() => {
		const channel = LoveNoteEventsService.getInstance()
			.onUpdate('UPDATE_STATE_LOVE_NOTE', (payload: LoveNoteResponse) =>
				handle(payload),
			)
			.subscribe();

		return () => {
			channel.unsubscribe();
		};
	}, [handle]);
}
