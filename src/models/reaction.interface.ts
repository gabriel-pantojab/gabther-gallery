export interface ReactionDB {
	id: number;
	created_at: string;
	id_love_note: number;
	id_user: string;
	reaction: ReactionType;
}

export enum ReactionType {
	SAD = 'SAD',
	HAPPY = 'HAPPY',
	LOVE = 'LOVE',
}

export interface ReactionData {
	id: number;
	created_at: string;
	id_love_note: number;
	user: { name: string; id: string };
	reaction: ReactionType;
}
