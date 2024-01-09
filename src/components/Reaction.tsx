import { ReactionType } from '../models/reaction.interface';

export default function Reaction({
	type,
}: {
	type: ReactionType;
}): JSX.Element {
	if (type === ReactionType.HAPPY) {
		return <span>🤗</span>;
	} else if (type === ReactionType.LOVE) {
		return <span>💖</span>;
	} else {
		return <span>😢</span>;
	}
}
