import { USER_ACTION_TYPES } from "./user.types";
import { AuthUserValue } from "interfaces/authentication";

export const setCurrentUser = (user: AuthUserValue) => ({
	type: USER_ACTION_TYPES.SET_CURRENT_USER,
	payload: user,
});

export const checkUserSession = () => ({
	type: USER_ACTION_TYPES.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
	type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (email: string, password: string) => ({
	type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	payload: { email, password },
});

export const signInSuccess = (user: AuthUserValue) => ({
	type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailed = (error: string) => ({
	type: USER_ACTION_TYPES.SIGN_IN_FAILED,
	payload: error,
});

export const signUpStart = (email: string, password: string, displayName: string) => ({
	type: USER_ACTION_TYPES.SIGN_UP_START,
	payload: { email, password, displayName },
});

export const signUpSuccess = (user: AuthUserValue, additionalDetails: any) => ({
	type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	payload: { user, additionalDetails },
});

export const signUpFailed = (error: any) => ({
	type: USER_ACTION_TYPES.SIGN_UP_FAILED,
	payload: error,
});

export const signOutStart = () => ({
	type: USER_ACTION_TYPES.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
});

export const signOutFailed = (error: any) => ({
	type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
	payload: error,
});
