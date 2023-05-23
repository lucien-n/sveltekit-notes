<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateFireNote } from '$lib/db.js';
	import { noteStore, type Note, user } from '$lib/stores';
	import { InputChip, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data;

	let note = data.note || { content: '', tags: [], id: '' };
	let tags: string[] = note.tags;
	let content: string = note.content;
	let noteId: string = note.id;

	const toast: ToastSettings = {
		message: 'Note edited successfully',
		background: 'variant-glass-success'
	};

	function editNote(): void {
		const note: Note = {
			id: noteId,
			content,
			tags
		};
		noteStore.update((notes) => [...notes.filter((note) => note.id !== noteId), note]);

		if ($user) {
			updateFireNote($user.uid, note);
		}

		content = '';
		tags = [];
		toastStore.trigger(toast);
		goto('/');
	}
</script>

<div class="container mx-auto flex h-full flex-col gap-8">
	<form class="card flex flex-col gap-3 p-4">
		<h2>Edit Note</h2>
		<textarea bind:value={content} class="textarea" placeholder="Note content..." rows="5" />
		<InputChip bind:value={tags} name="tags" placeholder="Tags..." />
		<button type="button" on:click={editNote} class="btn variant-ghost-primary self-end"
			>Save</button
		>
	</form>
</div>
