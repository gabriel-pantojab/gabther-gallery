import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteService } from '../services/love-note.service';
import { LoveNoteMapper } from '@/core/mappers/love-note.mapper';
import { ToastService } from '@/core/service/toast.service';
import { useChangeLoveNoteStateEvent } from './events/use-change-love-note-state-event';

type Return = {
	loveNotes: LoveNote[] | null;
};

export function useSentLoveNotes(): Return {
	const { currentUser } = useContext(UserContext);
	const [loveNotes, setLoveNotes] = useState<LoveNote[] | null>(null);

	const listenChangeState = useCallback(
		(loveNote: LoveNote) => {
			setLoveNotes(prev => {
				if (prev === null) return prev;
				const index = prev.findIndex(loveNote => loveNote.id === loveNote.id);
				const temp = [...prev];
				temp[index].state = loveNote.state;
				return temp;
			});
		},
		[setLoveNotes],
	);

	useChangeLoveNoteStateEvent(listenChangeState);

	useEffect(() => {
		if (currentUser === null) return;
		getLoveNotes();
	}, [currentUser]);

	const getLoveNotes = async () => {
		try {
			if (currentUser?.id === undefined) return;
			const loveNotes = await LoveNoteService.getInstance().findSentLoveNotes(
				currentUser?.id,
			);
			setLoveNotes(LoveNoteMapper.many(loveNotes));
		} catch (error: any) {
			ToastService.getInstance().error(error.message);
			setLoveNotes([]);
		}
	};

	return { loveNotes };
}
