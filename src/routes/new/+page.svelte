<script lang="ts">
	import { goto } from '$app/navigation';
	import NoteCard from '$lib/components/NoteCard.svelte';
	import { db } from '$lib/firebase';
	import { noteStore, user } from '$lib/stores';
	import { doc, setDoc } from '@firebase/firestore';
	import { InputChip, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let tags: string[] = [];
	let content: string = '';

	const toast: ToastSettings = {
		message: 'Note created successfully',
		background: 'variant-filled-success'
	};

	async function createNote(): Promise<void> {
		const note = {
			id: crypto.randomUUID(),
			content: content,
			tags: tags
		};
		noteStore.update((notes) => [...notes, note]);

		if ($user) {
			await setDoc(doc(db, 'notes', `${$user.uid}`, 'notes', note.id), note);
		}

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
	<hr />
	<!-- <h1 class="self-center text-xl font-bold">Preview</h1> -->
	<NoteCard note={{ id: '', content: content, tags: tags }} />
</div>
