import { auth, db } from '$lib/firebase';
import { user } from '$lib/stores';
import { collection, collectionGroup } from '@firebase/firestore';

auth.onAuthStateChanged(async (fireUser) => {
	if (fireUser) {
		user.set(fireUser);
		console.log(fireUser.displayName);
		return;
	} else {
		user.set(null);
	}
});

