export interface Template {
	id: number;
	name: string;
	url_template: UrlTemplate[];
	created_at: Date;
}

export interface UrlTemplate {
	id: number;
	url: string;
}
