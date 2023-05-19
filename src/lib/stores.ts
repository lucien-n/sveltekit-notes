import type { User } from '@firebase/auth';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';

export type Note = {
	id: string;
	content: string;
	tags: string[];
};

export type FilterSettings = {
	matchEvery: boolean;
	tags: string[];
	refresh: number;
};

export const noteStore: Writable<Note[]> = localStorageStore('notes', []);
export const filterSettings: Writable<FilterSettings> = writable({
	matchEvery: false,
	tags: [],
	refresh: 1
});
export const user: Writable<User | null> = writable();

export const refreshNotes = () => {
	filterSettings.subscribe((settings) => {
		settings.refresh++
	})
}