import supabase from '@/core/supabase/supabase-client';
import SupabaseError from '@/core/supabase/supabase-error';
import {
	PostgrestError,
	RealtimeChannel,
	RealtimePostgresChangesPayload,
} from '@supabase/supabase-js';

export class AlbumEventsService {
	static #instance: AlbumEventsService;

	private constructor() {}

	public static getInstance(): AlbumEventsService {
		if (!AlbumEventsService.#instance) {
			AlbumEventsService.#instance = new AlbumEventsService();
		}
		return AlbumEventsService.#instance;
	}

	public on<T extends { [key: string]: any }>(
		event: 'INSERT' | 'UPDATE' | 'DELETE',
		table: string,
		channel: string,
		callback: (payload: RealtimePostgresChangesPayload<T>) => void,
	): RealtimeChannel {
		const channelEvent = supabase.channel(channel);
		let onEvent;
		if (event === 'INSERT') {
			onEvent = channelEvent.on(
				'postgres_changes',
				{ event, schema: 'public', table },
				(payload: any) => {
					callback(payload as RealtimePostgresChangesPayload<T>);
				},
			);
		}

		if (event === 'UPDATE') {
			onEvent = channelEvent.on(
				'postgres_changes',
				{ event, schema: 'public', table },
				(payload: any) => {
					callback(payload as RealtimePostgresChangesPayload<T>);
				},
			);
		}

		if (event === 'DELETE') {
			onEvent = channelEvent.on(
				'postgres_changes',
				{ event, schema: 'public', table },
				(payload: any) => {
					callback(payload as RealtimePostgresChangesPayload<T>);
				},
			);
		}

		if (onEvent === undefined) {
			throw new SupabaseError(
				new PostgrestError({
					code: '0',
					details: `Failed to subscribe to postgres_changes for table '${table}' on channel '${channel}'. Event type '${event}' did not match any valid handler.`,
					hint: `Verify that the event type is one of: INSERT, UPDATE, DELETE. Check if the table '${table}' exists and you have proper permissions.`,
					message: `Unable to create realtime subscription for ${event} events on ${table}`,
				}),
			);
		}

		return onEvent;
	}
}
