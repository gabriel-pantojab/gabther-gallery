import {
	RealtimeChannel,
	RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';
import supabase from '../supabase/supabase-client';

export class DatabaseEventsService<T extends Record<string, any>> {
	protected table: string;
	protected schema: string;

	protected constructor(schema: string, table: string) {
		this.table = table;
		this.schema = schema;
	}

	public onInsert(
		channel: string,
		callback: (payload: T) => void,
	): RealtimeChannel {
		const channelEvent = supabase.channel(channel);

		return channelEvent.on(
			'postgres_changes',
			{ event: 'INSERT', schema: this.schema, table: this.table },
			(payload: RealtimePostgresChangesPayload<T>) => {
				callback(payload.new as T);
			},
		);
	}

	public onUpdate(
		channel: string,
		callback: (payload: T) => void,
	): RealtimeChannel {
		const channelEvent = supabase.channel(channel);

		return channelEvent.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: this.schema, table: this.table },
			(payload: RealtimePostgresChangesPayload<T>) => {
				callback(payload.new as T);
			},
		);
	}

	public onDelete(
		channel: string,
		callback: (payload: T) => void,
	): RealtimeChannel {
		const channelEvent = supabase.channel(channel);

		return channelEvent.on(
			'postgres_changes',
			{ event: 'DELETE', schema: this.schema, table: this.table },
			(payload: RealtimePostgresChangesPayload<T>) => {
				callback(payload.new as T);
			},
		);
	}
}
