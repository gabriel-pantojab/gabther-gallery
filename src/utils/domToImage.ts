import domtoimage, { type Options } from 'dom-to-image';

export async function domToPng(
	dom: HTMLElement,
	options?: Options,
): Promise<Blob> {
	const blob = await domtoimage.toBlob(dom, options);
	return blob;
}
