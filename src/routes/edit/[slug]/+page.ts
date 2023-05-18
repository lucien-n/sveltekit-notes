import { noteStore } from '$lib/stores.js';

export function load({ params }) {
	const noteId = params.slug;

	let note;
	const unsubscribe = noteStore.subscribe(
		(notes) => (note = notes.filter((note) => note.id === noteId))
	);


	if (note) {
		return {
			note: note[0]
		};
	}
}
