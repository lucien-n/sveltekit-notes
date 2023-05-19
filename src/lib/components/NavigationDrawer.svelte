<script lang="ts">
	import { noteStore, type Note } from '$lib/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import NoNote from './NoNote.svelte';
	import NoteDrawerLink from './NoteDrawerLink.svelte';

	const maxNoteContentLengthInDrawer = 20;
	function closeDrawer(): void {
		drawerStore.close();
	}
</script>

<nav id="navigation-drawer" class="list-nav h-full p-4">
	{#if $noteStore.length > 0}
		<ul>
			{#each $noteStore as note}
				<NoteDrawerLink {note} on:close-drawer={closeDrawer} {maxNoteContentLengthInDrawer} />
			{/each}
		</ul>
	{:else}
		<NoNote />
	{/if}
</nav>
