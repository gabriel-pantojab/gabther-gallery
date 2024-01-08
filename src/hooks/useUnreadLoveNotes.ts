import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/userContext';
import { getCountUnreadLoveNotes } from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';

interface TypeReturnHook {
	unreadLoveNotes: number;
}

export default function useUnreadLoveNotes(): TypeReturnHook {
	const { currentUser } = useContext(UserContext);
	const { supabase } = useContext(SupabaseContext);
	const [unreadLoveNotes, setUnreadLoveNotes] = useState(0);

	useEffect(() => {
		if (currentUser !== null) {
			getCountUnreadLoveNotes(currentUser.id, supabase)
				.then(data => {
					setUnreadLoveNotes(data);
				})
				.catch(error => {
					console.log(error);
				});
		}

		const updateChannel = supabase
			.channel('update-love-note')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'love_note' },
				(payload: any) => {
					if (payload.new.state === 'READ') {
						setUnreadLoveNotes(prev => {
							return prev - 1;
						});
					} else {
						setUnreadLoveNotes(prev => {
							return prev + 1;
						});
					}
				},
			)
			.subscribe();

		const insertChannel = supabase
			.channel('insert-love-note')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'love_note' },
				(payload: any) => {
					if (payload.new.author !== currentUser?.id) {
						setUnreadLoveNotes(prev => {
							return prev + 1;
						});
					}
				},
			)
			.subscribe();

		return () => {
			updateChannel.unsubscribe();
			insertChannel.unsubscribe();
		};
	}, [currentUser]);

	return { unreadLoveNotes };
}
