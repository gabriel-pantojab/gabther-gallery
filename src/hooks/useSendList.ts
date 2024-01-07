import { useContext, useEffect, useState } from 'react';

import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';
import { type LoveNote } from '../models/loveNote.interface';
import { getSendLoveNotes } from '../utils/supabase';

interface TypeReturnHook {
	sendLoveNotes: LoveNote[] | null;
}

export default function useSendList(): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);

	const [sendLoveNotes, setSendLoveNotes] = useState<LoveNote[] | null>([]);

	useEffect(() => {
		if (currentUser === null) return;
		setSendLoveNotes(null);
		getSendLoveNotes(currentUser.id, supabase)
			.then(data => {
				setSendLoveNotes(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [currentUser]);

	useEffect(() => {
		const updateChannel = supabase
			.channel('read_love_notes')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'love_note' },
				(payload: any) => {
					setSendLoveNotes(prev => {
						if (prev !== null) {
							const index = prev.findIndex(
								loveNote => loveNote.id === payload.new.id,
							);
							const temp = [...prev];
							temp[index].state = payload.new.state;
							return temp;
						}
						return null;
					});
				},
			)
			.subscribe();

		return () => {
			updateChannel.unsubscribe();
		};
	}, []);

	return { sendLoveNotes };
}
