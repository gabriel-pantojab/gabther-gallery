import { useContext, useEffect, useState } from 'react';

import supabase from '../services/supabase-service';
import { getCountUnreadLoveNotes } from '../services/love-note-service';

import { UserContext } from '../context/userContext';

interface TypeReturnHook {
	unreadLoveNotes: number;
}

export default function useUnreadLoveNotes(): TypeReturnHook {
	const { currentUser } = useContext(UserContext);
	const [unreadLoveNotes, setUnreadLoveNotes] = useState(0);

	useEffect(() => {
		if (currentUser !== null) {
			getCountUnreadLoveNotes(currentUser.id)
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
			void updateChannel.unsubscribe();
			void insertChannel.unsubscribe();
		};
	}, [currentUser]);

	return { unreadLoveNotes };
}
