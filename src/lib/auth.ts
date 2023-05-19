import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	type UserCredential
} from '@firebase/auth';
import { auth } from './firebase';

export function signInWithEmailAndPassword(
	email: string,
	password: string
): Promise<UserCredential> {
	return signInWithEmailAndPassword(email, password);
}

export function signUpWithEmailAndPassword(
	email: string,
	password: string
): Promise<UserCredential> {
	return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle(): Promise<UserCredential> {
	 return signInWithPopup(auth, new GoogleAuthProvider()); 
}

export function signOut(): Promise<void> {
	return auth.signOut();
}
