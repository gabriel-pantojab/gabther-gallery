import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { LoveNote } from '@/core/types/domain/love-note';
import { LoveNoteMapper } from '@/core/mappers/love-note.mapper';
import { ToastService } from '@/core/service/toast.service';
import { LoveNoteService } from '../services/love-note.service';
import { useReceivedLoveNotesEvent } from './events/use-received-love-notes-event';

type Return = {
	loveNotes: LoveNote[] | null;
};

export function useReceivedLoveNotes(): Return {
	const { currentUser } = useContext(UserContext);
	const [loveNotes, setLoveNotes] = useState<LoveNote[] | null>(null);
	useReceivedLoveNotesEvent((loveNote: LoveNote) => {
		if (loveNote.author !== currentUser?.id) {
			setLoveNotes(prev => {
				if (prev === null) return prev;
				return [loveNote, ...prev];
			});
		}
	});

	useEffect(() => {
		if (currentUser === null) return;
		getLoveNotes();
	}, [currentUser]);

	const getLoveNotes = async () => {
		try {
			if (currentUser?.id === undefined) return;
			const loveNotes =
				await LoveNoteService.getInstance().findReceivedLoveNotes(
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
