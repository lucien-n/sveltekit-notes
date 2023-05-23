import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCXOnZ5Padyrd8Z-_zOooHCb4cU-UpvTwk',
	authDomain: 'svelte-le.firebaseapp.com',
	projectId: 'svelte-le',
	storageBucket: 'svelte-le.appspot.com',
	messagingSenderId: '876172244702',
	appId: '1:876172244702:web:7616f7c25e7c07acb7b44f'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
