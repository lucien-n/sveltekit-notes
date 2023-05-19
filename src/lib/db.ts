import { WriteBatch, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, writeBatch } from '@firebase/firestore';
import { db } from '$lib/firebase';
import { refreshNotes, type Note } from '$lib/stores';

export async function getFireNotes(user_id: string): Promise<Note[]> {
	let notes: Note[] = [];

	const q = query(collection(db, 'users', user_id, 'notes'));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const note: Note = {
			id: doc.get('id'),
			content: doc.get('content'),
			tags: doc.get('tags')
		};
		notes.push(note);
	});
	refreshNotes()

	return notes;
}

export async function postFireNote(user_id: string, note: Note): Promise<void> {
	await setDoc(doc(db, 'users', user_id, 'notes', note.id), note);
	refreshNotes()
}

export async function postFireNotes(user_id: string, notes: Note[]): Promise<void> {
	const batch: WriteBatch = writeBatch(db);
	notes.forEach((note: Note) => {
		const noteRef = doc(db, 'users', user_id, 'notes', note.id)
		batch.set(noteRef, note)
	})
	batch.commit()
	refreshNotes()
}

export async function deleteFireNote(user_id: string, note_id: string): Promise<void> {
	await deleteDoc(doc(db, 'users', user_id, 'notes', note_id))
	refreshNotes()
}

export async function updateFireNote(user_id: string, note: Note): Promise<void> {
	await updateDoc(doc(db, 'users', user_id, 'notes', note.id), note)
	refreshNotes()
}