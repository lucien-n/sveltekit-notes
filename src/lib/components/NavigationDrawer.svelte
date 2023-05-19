<script lang="ts">
	import { noteStore, type Note } from '$lib/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import NoNote from './NoNote.svelte';

	const maxNoteContentLengthInDrawer = 20;

	function closeDrawer(): void {
		drawerStore.close();
	}

	function formattedNoteContent(note: Note): string {
		return `${note.content.slice(0, maxNoteContentLengthInDrawer)}${
			note.content.length > maxNoteContentLengthInDrawer ? '...' : ''
		}`;
	}
</script>

<nav class="list-nav h-full p-4">
	{#if $noteStore.length > 0}
		<ul>
			{#each $noteStore as note}
				<li>
					<a on:click={closeDrawer} href="/edit/{note.id}">{formattedNoteContent(note)}</a>
				</li>
			{/each}
		</ul>
	{:else}
		<NoNote />
	{/if}
</nav>
