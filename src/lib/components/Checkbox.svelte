<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string = 'Checkbox';

	const disptach = createEventDispatcher();
</script>

<label class="btn variant-ringed" for="match-every"
	>{label}
	<br />
	<input
		on:click={() => disptach('click')}
		type="checkbox"
		class="variant-glass aspect-square rounded-[4px]"
		id="match-every"
	/>
</label>
