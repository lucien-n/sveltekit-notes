<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/auth';

	signOut().then((_) => {
		if (browser) {
			goto('/');
		}
	});
</script>
