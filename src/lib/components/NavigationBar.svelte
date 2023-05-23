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

<nav id="navigation-bar">
	<AppBar>
		<svelte:fragment slot="lead">
			<div class="flex flex-row items-center gap-2">
				<button class="btn btn-sm md:hidden" on:click={openDrawer}>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-7 w-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</span>
				</button>
				<a href="/" class="flex items-center gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					<h4 class="h4 invisible md:visible">Notes</h4>
				</a>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="trail">
			{#if $user}
				<!-- <a href="/signout" class="btn variant-glass-warning">signout</a> -->
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
						<h4 class="h4">New</h4>
					</span>
				</a>
				<a href="/signout" class="btn variant-glass-warning hidden md:flex">
					<span class="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
						<h4 class="h4">Sign Out</h4>
					</span>
				</a>
				<Avatar
					width="w-12"
					initials={getUserInitials()}
					background="variant-glass bg-gradient-to-br from-primary-800 to-secondary-900"
					cursor="cursor-pointer"
					border="variant-ghost-secondary"
				/>
			{:else}
				<a href="/auth" class="btn variant-ghost-primary text-lg">Sign In</a>
			{/if}
		</svelte:fragment>
	</AppBar>
</nav>
