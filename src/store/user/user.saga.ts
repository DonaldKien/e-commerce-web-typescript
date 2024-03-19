import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser,
} from "utils/firebase/firebase.utils";
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpSuccess,
	EmailSignInStart,
	SignUpSuccess,
	SignUpStart,
} from "./user.action";
import { AuthUserValue } from "interfaces/authentication";
import { AdditionalInformation } from "interfaces/firebase";

function* getSnapshotFromUserAuth(
	userAuth: AuthUserValue,
	additionalDetails?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
		if (userSnapshot) {
			yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth, undefined);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* googleSignInHandler() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user, undefined);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}
function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignInHandler);
}

function* emailSignInHandler({ payload }: EmailSignInStart) {
	const { email, password } = payload;
	try {
		const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user, undefined);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInHandler);
}

function* signUpHandler({ payload }: SignUpStart) {
	const { email, password, displayName } = payload;
	try {
		const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpHandler);
}

function* signInAfterSignUpHandler({ payload }: SignUpSuccess) {
	const { user, additionalDetails } = payload;
	yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUpHandler);
}

function* signOutHandler() {
	try {
		yield* call(signOutAuthUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutHandler);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
