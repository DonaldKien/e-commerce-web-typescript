import { Action, ActionWithPayload, createAction, withMatcher } from "utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
	AuthUserValue,
	EmailSignIn,
	UserSignUp,
	UserSignUpSuccess,
} from "interfaces/authentication";
import { UserData } from "interfaces/firebase";

type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, AuthUserValue>;

export const setCurrentUser = withMatcher(
	(user: AuthUserValue): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, EmailSignIn>;

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;

export const signInFailed = withMatcher(
	(error: Error): SignInFailed => ({
		type: USER_ACTION_TYPES.SIGN_IN_FAILED,
		payload: error,
	})
);

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, UserSignUp>;

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart => ({
		type: USER_ACTION_TYPES.SIGN_UP_START,
		payload: { email, password, displayName },
	})
);

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, UserSignUpSuccess>;

export const signUpSuccess = withMatcher(
	(user: AuthUserValue, additionalDetails: any): SignUpSuccess => ({
		type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
		payload: { user, additionalDetails },
	})
);

type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailed => ({
		type: USER_ACTION_TYPES.SIGN_UP_FAILED,
		payload: error,
	})
);

type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export const signOutStart = withMatcher(
	(): SignOutStart => ({
		type: USER_ACTION_TYPES.SIGN_OUT_START,
	})
);

type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => ({
		type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
	})
);

type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;

export const signOutFailed = withMatcher(
	(error: Error): SignOutFailed => ({
		type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
		payload: error,
	})
);
