<script lang="ts">
	import { goto } from '$app/navigation';
	import { noteStore } from '$lib/stores';
	import { InputChip, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let tags: string[] = [];
	let content: string;

	const toast: ToastSettings = {
		message: 'Note created successfully',
		background: 'variant-filled-success'
	};

	function createNote(): void {
		noteStore.update((notes) => [
			...notes,
			{
				id: crypto.randomUUID(),
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
		<h2>New Note</h2>
		<textarea bind:value={content} class="textarea" placeholder="Note content..." rows="5" />
		<InputChip bind:value={tags} name="tags" placeholder="Tags..." />
		<button type="button" on:click={createNote} class="btn variant-ghost-primary self-end"
			>Create note</button
		>
	</form>
</div>
