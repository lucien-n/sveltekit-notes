<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { AppBar, Avatar, drawerStore } from '@skeletonlabs/skeleton';

	function openDrawer(): void {
		drawerStore.open();
	}

	function getUserInitials(): string {
		let splittedName = $user?.displayName?.split(' ');
		if (!splittedName) return 'NF';
		return `${splittedName[0][0]}${splittedName[1][0]}`;
	}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<button class="btn btn-sm mr-4 md:hidden" on:click={openDrawer}>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-8 w-8"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</span>
		</button>
		<a href="/">
			<strong class="text-xl">Notes</strong>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $user}
		<a href="/signout" class="btn variant-glass-warning">signout</a>
			<a href="/new" class="btn variant-glass-secondary">
				<span class="flex items-center gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					<h1 class="text-lg">New</h1>
				</span>
			</a>
			<Avatar
				width="w-12"
				initials={getUserInitials()}
				class="variant-ghost-secondary bg-gradient-to-br from-secondary-900 to-tertiary-900"
			/>
		{:else}
			<a href="/auth" class="btn variant-ghost-primary text-lg">Sign In</a>
		{/if}
	</svelte:fragment>
</AppBar>
