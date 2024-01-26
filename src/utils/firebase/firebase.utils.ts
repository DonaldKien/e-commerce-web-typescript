import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBkHk8U3j_9vLPYaJL6z1fHapg-0dwyACk",
	authDomain: "e-commerce-db-1981c.firebaseapp.com",
	projectId: "e-commerce-db-1981c",
	storageBucket: "e-commerce-db-1981c.appspot.com",
	messagingSenderId: "418629317711",
	appId: "1:418629317711:web:924547178d6476aab3263a",
	measurementId: "G-QGT2MZW9BR",
};

type ObjectToAdd = {
	title: string;
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const db = getFirestore();
export const auth = getAuth();

// AUTHENTICATION

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createUserDocumentFromAuth = async (userAuth: any, additionalInformation?: any) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error: any) {
			console.log("Error creating user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
	return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

// DATABASE

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

type CategoryMap = {
	[key: string]: {
		title: string;
		items: any[];
	}[];
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap: CategoryMap = querySnapshot.docs.reduce((acc: CategoryMap, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		const titleKey: string = title.toLowerCase();
		acc[`${titleKey}`] = items;
		return acc;
	}, {});
	return categoryMap;
};
