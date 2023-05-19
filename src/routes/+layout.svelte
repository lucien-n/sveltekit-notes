<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { fly } from 'svelte/transition';
	import { AppShell, Drawer, Toast, Modal } from '@skeletonlabs/skeleton';
	import NavigationDrawer from '$lib/components/NavigationDrawer.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';

	export let data;
</script>

<Toast position="tr" />
<Modal />

<Drawer>
	<NavigationDrawer />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-80 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<NavigationBar />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<NavigationDrawer />
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
