<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let tag: string;
	export let i: number = 0;
</script>

<span
	in:fly={{ x: -140, duration: 200, delay: 50 * (i + 1) }}
	on:keypress={(event) => {
		if (event.key === 'Enter') dispatch('filter', tag);
	}}
	on:click={() => dispatch('filter', tag)}
	class="badge variant-filled-secondary hover:cursor-pointer hover:underline">{tag}</span
>
