export function isPhoto(url: string): boolean {
	return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export function isVideo(url: string): boolean {
	return url.match(/\.(mp4|webm|ogg)$/) != null;
}
