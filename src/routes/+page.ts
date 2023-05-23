import { auth, db } from '$lib/firebase';
import { user } from '$lib/stores';

auth.onAuthStateChanged(async (fireUser) => {
	if (fireUser) {
		user.set(fireUser);
		return;
	} else {
		user.set(null);
	}
});
