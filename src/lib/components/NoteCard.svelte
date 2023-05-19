<script lang="ts">
	import { goto } from '$app/navigation';
	import { noteStore, type Note, filterSettings } from '$lib/stores';
	import {
		toastStore,
		type ModalSettings,
		type ToastSettings,
		modalStore
	} from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let note: Note;
	let showActions = false;
	const dispatch = createEventDispatcher();

	const noteDeletedToast: ToastSettings = {
		message: 'Note deleted successfully',
		background: 'variant-glass-success'
	};
	const noteNotDeletedToast: ToastSettings = {
		message: 'Note not deleted',
		background: 'variant-glass-error'
	};

	function deleteNote(noteId: string): void {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Delete Note',
			body: 'Are you sure you want to delete this note',
			response: (r: boolean) => {
				if (r) {
					noteStore.update((notes) => notes.filter((n) => n.id !== noteId));
					toastStore.trigger(noteDeletedToast);
					$filterSettings.refresh++;
					return;
				}
				toastStore.trigger(noteNotDeletedToast);
			}
		};
		modalStore.trigger(confirmDelete);
	}
</script>

<div
	class="variant-glass-material card relative flex flex-col gap-2 p-4"
	on:mouseenter={() => {
		showActions = true;
	}}
	on:mouseleave={() => {
		showActions = false;
	}}
>
	{#if showActions}
		<div
			in:fly={{ y: -100, duration: 200 }}
			class="absolute -right-2 -top-2 flex flex-col-reverse gap-2 transition-all duration-100 ease-in-out"
		>
			<button
				on:click={() => goto(`/edit/${note.id}`)}
				class=" btn btn-sm variant-glass-tertiary aspect-square p-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
					/>
				</svg>
			</button>
			<button
				on:click={() => deleteNote(note.id)}
				class="btn btn-sm variant-glass-error aspect-square p-2"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-4 w-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
		</div>
	{/if}
	<div>
		{note.content}
	</div>
	<div class="flex flex-wrap gap-1">
		{#each note.tags as tag, i}
			<span
				in:fly={{ x: -140, duration: 200, delay: 50 * (i + 1) }}
				on:keypress={(event) => {
					if (event.key === 'Enter') dispatch('filter', tag);
				}}
				on:click={() => dispatch('filter', tag)}
				class="badge variant-filled-secondary hover:cursor-pointer hover:underline">{tag}</span
			>
		{/each}
	</div>
</div>
