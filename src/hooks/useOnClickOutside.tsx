import { type RefObject, useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: AnyEvent) => void,
	noRef?: RefObject<T>,
): void {
	useEffect(() => {
		const listener = (event: AnyEvent): void => {
			const el = ref?.current;
			const noEl = noRef?.current;
			if (
				el === null ||
				el === undefined ||
				el.contains(event.target as Node) ||
				(noEl !== null &&
					noEl !== undefined &&
					noEl.contains(event.target as Node))
			) {
				return;
			}
			handler(event);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
}

export default useOnClickOutside;
