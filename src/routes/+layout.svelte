<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { fly } from 'svelte/transition';
	import { AppShell, Toast, Modal } from '@skeletonlabs/skeleton';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import { noteStore, user } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { postFireNotes } from '$lib/db';

	export let data;

	const _ = user.subscribe((fireUser) => {
		if (!fireUser) return;
		postFireNotes(fireUser.uid, $noteStore);
		goto('/');
	});
</script>

<svelte:head>
	<title>Seton</title>
</svelte:head>

<Toast position="tr" />
<Modal />

<AppShell slotSidebarLeft="w-0 md:w-80 lg:w-1/4 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<NavigationBar />
	</svelte:fragment>
	<!-- Router Slot -->
	{#key data.url}
		<div
			class="container mx-auto h-full p-10"
			in:fly={{ x: -200, delay: 300, duration: 300 }}
			out:fly={{ x: 200, duration: 300 }}
		>
			<slot />
		</div>
	{/key}
	<!-- ---- / ---- -->
</AppShell>
