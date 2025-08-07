import { MyValentin2025 } from '../../components/special-notes/notes/my-valentin-2025/my-valentin-2025';
import { type SpecialNoteCard } from '../../models/special-note-card.interface';

export const SPECIAL_NOTES: SpecialNoteCard[] = [
	{
		specialName: 'My Valentine 2025',
		specialRoute: '/special-notes/my-valentine-2025',
		element: <MyValentin2025 />,
	},
];
