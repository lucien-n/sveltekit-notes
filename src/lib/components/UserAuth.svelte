<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		signInWithEmailAndPassword,
		signInWithGoogle,
		signUnWithEmailAndPassword as signUpWithEmailAndPassword
	} from '$lib/auth';
	import { toastStore } from '@skeletonlabs/skeleton';

	let email: string;
	let password: string;

	const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
	const passwordRegex = /^(?=.*[a-z].*[a-z])(?=.*[!"#...\d].*[!"#...\d]).{8,}$/gim;

	async function authenticate(mode: string): Promise<void> {
		if (mode === 'google') {
			signInWithGoogle();
			goto('/');
			return;
		}

		if (!emailRegex.test(email)) {
			toastStore.trigger({
				message: 'Invalid email format',
				background: 'variant-glass-warning'
			});
			return;
		}
		if (!passwordRegex.test(password)) {
			toastStore.trigger({
				message:
					'Password must be atleast 8 characters long, contain a number and a special character',
				background: 'variant-glass-warning'
			});
			return;
		}

		try {
			if (mode === 'signin') {
				await signInWithEmailAndPassword(email, password).then(() => {
					goto('/ ');
				});
			} else if (mode === 'signup') {
				await signUpWithEmailAndPassword(email, password).then(() => {
					goto('/');
				});
			}
		} catch (error) {
			toastStore.trigger({
				message: 'An error occured',
				background: 'variant-glass-error'
			});
		}
	}
</script>

<div class="card variant-glass">
	<div class="space-y-4 p-4">
		<div class="flex w-full justify-center">
			<button class="btn variant-glass-tertiary mx-auto" on:click={() => authenticate('google')}>
				Sign In With Google
			</button>
		</div>
		<hr />
		<label for="" class="label">
			<span>Email</span>
			<input bind:value={email} type="text" class="input" placeholder="Email" />
		</label>
		<label for="" class="label">
			<span>Password</span>
			<input
				bind:value={password}
				type="password"
				class="input"
				placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
			/>
		</label>
		<hr />
		<div class="flex w-full">
			<button class="btn variant-glass-primary mx-auto" on:click={() => authenticate('signin')}>
				Sign In
			</button>
			<button class="btn variant-glass-primary mx-auto" on:click={() => authenticate('signup')}>
				Sign Up
			</button>
		</div>
	</div>
</div>
