<script lang="ts">
	import { goto } from '$app/navigation';
	import { noteStore, type Note } from '$lib/stores';
	import { InputChip, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data;

	let note = data.note || { content: '', tags: [], id: '' };
	let tags: string[] = note.tags;
	let content: string = note.content;
	let noteId: string = note.id;

	const toast: ToastSettings = {
		message: 'Note edited successfully',
		background: 'variant-ghost-success'
	};

	function editNote(): void {
		noteStore.update((notes) => [
			...notes.filter((note) => note.id !== noteId),
			{
				id: noteId,
				content,
				tags
			}
		]);
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
