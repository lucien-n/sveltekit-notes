<script lang="ts">
	import { goto } from '$app/navigation';
	import NoNote from '$lib/components/NoNote.svelte';
	import NoteCard from '$lib/components/NoteCard.svelte';
	import { noteStore, type Note } from '$lib/stores';

	export let data;
	let filterTag = data.filterTag;

	function filteredNoteStore(): Note[] {
		let filteredNotes: Note[] = [];
		let _ = noteStore.subscribe(
			(notes) =>
				(filteredNotes = notes.filter((note) =>
					filterTag === '' ? true : note.tags.includes(filterTag)
				))
		);
		return filteredNotes;
	}
</script>

<div class="container mx-auto flex h-full flex-col gap-8">
	{#if $noteStore.length > 0}
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
			{#key filterTag}
				{#each filteredNoteStore() as note}
					<NoteCard
						{note}
						on:filter={(event) => {
							goto(`/?filter=${event.detail}`);
						}}
					/>
				{/each}
			{/key}
		</div>
	{:else}
		<NoNote />
	{/if}
</div>
