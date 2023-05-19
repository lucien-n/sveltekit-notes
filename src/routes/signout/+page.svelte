<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/auth';

	signOut();
	goto('/');
</script>
