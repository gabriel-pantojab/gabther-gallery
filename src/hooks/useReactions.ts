import { useCallback, useContext, useEffect, useState } from 'react';

import { type ReactionType } from '../models/reaction.interface';
import {
	deleteReaction,
	getReactionsLoveNote,
	getUserName,
	insertReaction,
	updateReaction,
} from '../utils/supabase';
import { SupabaseContext } from '../context/supabaseContext';
import { UserContext } from '../context/userContext';

interface User {
	name: string;
	id: string;
}

interface TypeReturnHook {
	reactions: ReactionType[];
	reactionUser: ReactionType | null;
	handleUpdateReaction: (type: ReactionType) => Promise<void>;
}

export default function useReactions({
	idLoveNote,
}: {
	idLoveNote: number;
}): TypeReturnHook {
	const { supabase } = useContext(SupabaseContext);
	const { currentUser } = useContext(UserContext);
	const [reactionsMap, setReactionsMap] = useState<Map<ReactionType, User[]>>(
		new Map<ReactionType, User[]>(),
	);
	const [reactionUser, setReactionUser] = useState<ReactionType | null>(null);

	useEffect(() => {
		const updateChannel = supabase
			.channel(`reactions-${idLoveNote}`)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'reaction' },
				(payload: any) => {
					const newReaction = payload.new;

					let oldTypeReaction: ReactionType | null = null;

					for (const [type, users] of reactionsMap) {
						if (
							currentUser?.id !== newReaction.id_user &&
							users.some(user => user.id === newReaction.id_user)
						) {
							oldTypeReaction = type;
							break;
						}
					}

					if (oldTypeReaction !== null) {
						const user = reactionsMap
							.get(oldTypeReaction)
							?.find(user => user.id === newReaction.id_user);
						if (user !== undefined) {
							updateReactionsMap(
								newReaction.reaction as ReactionType,
								oldTypeReaction,
								newReaction.id_user as string,
								user.name,
							);
						}
					}
				},
			)
			.subscribe();

		const insertChannel = supabase
			.channel(`reactions-insert-${idLoveNote}`)
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'reaction' },
				async (payload: any) => {
					const newReaction = payload.new;
					const nameUser = await getUserName(
						newReaction.id_user as string,
						supabase,
					);
					const temp = structuredClone(reactionsMap);
					if (!temp.has(newReaction.reaction as ReactionType)) {
						temp.set(newReaction.reaction as ReactionType, [
							{
								name: nameUser,
								id: newReaction.id_user,
							},
						]);
					} else {
						temp.get(newReaction.reaction as ReactionType)?.push({
							name: nameUser,
							id: newReaction.id_user,
						});
					}
					setReactionsMap(temp);
				},
			)
			.subscribe();

		const deleteChannel = supabase
			.channel(`reactions-delete-${idLoveNote}`)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'reaction' },
				(_: any) => {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					getReactions();
				},
			)
			.subscribe();

		return () => {
			updateChannel.unsubscribe();
			insertChannel.unsubscribe();
			deleteChannel.unsubscribe();
		};
	}, [reactionsMap, currentUser]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		getReactions();
	}, []);

	const getReactions = async (): Promise<void> => {
		try {
			const data = await getReactionsLoveNote(idLoveNote, supabase);

			const reactionsMap: Map<ReactionType, User[]> = new Map<
				ReactionType,
				User[]
			>();
			data.forEach(reaction => {
				if (!reactionsMap.has(reaction.reaction)) {
					reactionsMap.set(reaction.reaction, []);
				}

				reactionsMap.get(reaction.reaction)?.push({
					name: reaction.user.name,
					id: reaction.user.id,
				});
			});

			setReactionsMap(reactionsMap);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (currentUser !== null && reactionsMap.size > 0) {
			for (const [type, users] of reactionsMap) {
				if (users.some(user => user.id === currentUser.id)) {
					setReactionUser(type);
					break;
				}
			}
		}
	}, [currentUser, reactionsMap]);

	const mapToArray = (): ReactionType[] => {
		const ans: ReactionType[] = [];
		for (const [type] of reactionsMap) {
			ans.push(type);
		}
		return ans;
	};

	const insertReactionInMap = (
		type: ReactionType,
		map: Map<ReactionType, User[]>,
		idUser: string,
		nameUser: string,
	): Map<ReactionType, User[]> => {
		if (currentUser === null) return map;
		if (map.get(type) !== undefined) {
			map.get(type)?.push({
				name: nameUser,
				id: idUser,
			});
		} else {
			map.set(type, [
				{
					name: nameUser,
					id: idUser,
				},
			]);
		}
		return map;
	};

	const updateReactionsMap = (
		type: ReactionType,
		oldReaction: ReactionType | null,
		idUser: string,
		nameUser: string,
	): { action: string; oldReaction: ReactionType | null } => {
		let action = '';
		if (currentUser === null) return { action: '', oldReaction: null };
		let temp = structuredClone(reactionsMap);
		if (oldReaction !== null) {
			const reactionsWithoutCurrentUser = temp
				.get(oldReaction)
				?.filter(user => user.id !== idUser);

			if (
				reactionsWithoutCurrentUser !== undefined &&
				reactionsWithoutCurrentUser.length > 0
			)
				temp.set(oldReaction, reactionsWithoutCurrentUser);
			else temp.delete(oldReaction);

			if (oldReaction !== type) {
				temp = insertReactionInMap(type, temp, idUser, nameUser);
				action = 'update';
			} else {
				action = 'delete';
			}
		} else {
			temp = insertReactionInMap(type, temp, idUser, nameUser);
			action = 'insert';
		}
		setReactionsMap(temp);
		return { action, oldReaction };
	};

	const handleUpdateReaction = useCallback(
		async (type: ReactionType): Promise<void> => {
			if (currentUser !== null) {
				const { action, oldReaction } = updateReactionsMap(
					type,
					reactionUser,
					currentUser.id,
					currentUser.name,
				);
				if (action === '') return;
				if (action === 'insert') {
					try {
						setReactionUser(type);
						await insertReaction({
							idLoveNote: Number(idLoveNote),
							idUser: currentUser?.id,
							reaction: type,
							supabase,
						});
					} catch (error) {
						setReactionUser(null);
					}
				} else if (action === 'update') {
					try {
						setReactionUser(type);
						await updateReaction({
							idLoveNote: Number(idLoveNote),
							idUser: currentUser?.id,
							reaction: type,
							supabase,
						});
					} catch (error) {
						setReactionUser(oldReaction);
					}
				} else {
					try {
						setReactionUser(null);
						await deleteReaction({
							idLoveNote: Number(idLoveNote),
							idUser: currentUser?.id,
							supabase,
						});
					} catch (error) {
						setReactionUser(oldReaction);
					}
				}
			}
		},
		[currentUser, reactionUser, reactionsMap],
	);

	return {
		reactions: mapToArray(),
		reactionUser,
		handleUpdateReaction,
	};
}
