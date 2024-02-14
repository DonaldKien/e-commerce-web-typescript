import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutAuthUser,
} from "utils/firebase/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpSuccess } from "./user.action";
import { AuthUserValue } from "interfaces/authentication";

function* getSnapshotFromUserAuth(userAuth: AuthUserValue, additionalDetails: any): Generator<any, void, any> {
	try {
		const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error: any) {
		yield put(signInFailed(error));
	}
}

function* isUserAuthenticated(): Generator<any, void, any> {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth, undefined);
	} catch (error: any) {
		yield put(signInFailed(error));
	}
}

function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* googleSignInHandler() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user, undefined);
	} catch (error: any) {
		yield put(signInFailed(error));
	}
}

function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignInHandler);
}

function* emailSignInHandler({ payload }: any) {
	const { email, password } = payload;
	try {
		const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
		yield call(getSnapshotFromUserAuth, user, undefined);
	} catch (error: any) {
		yield put(signInFailed(error));
	}
}

function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInHandler);
}

function* signUpHandler({ payload }: any) {
	const { email, password, displayName } = payload;
	try {
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error: any) {
		yield put(signInFailed(error));
	}
}

function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpHandler);
}

function* signInAfterSignUpHandler({ payload }: any) {
	const { user, additionalDetails } = payload;
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUpHandler);
}

function* signOutHandler() {
	try {
		yield call(signOutAuthUser);
		yield put(signOutSuccess());
	} catch (error: any) {
		yield put(signOutFailed(error));
	}
}

function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutHandler);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
