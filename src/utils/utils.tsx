export function dateFormat(date: string): string {
	const d = date.split('T')[0];
	const h = date.split('T')[1];

	const year = d.split('-')[0];
	const month = d.split('-')[1];
	const day = d.split('-')[2];

	const hour = h.split(':')[0];
	const minute = h.split(':')[1];
	const second = h.split(':')[2].split('.')[0];

	return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
