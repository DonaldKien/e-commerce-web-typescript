import { AnyAction } from "redux";
import { AuthUserValue } from "interfaces/authentication";
import {
	emailSignInStart,
	googleSignInStart,
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutStart,
	signOutSuccess,
	signUpFailed,
	signUpStart,
} from "./user.action";

export type UserState = {
	readonly currentUser: AuthUserValue | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {
	if (
		signUpStart.match(action) ||
		googleSignInStart.match(action) ||
		emailSignInStart.match(action)
	) {
		return {
			...state,
			currentUser: null,
			isLoading: true,
		};
	}

	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
			isLoading: true,
		};
	}

	if (signOutStart.match(action)) {
		return {
			...state,
			isLoading: true,
		};
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			isLoading: false,
			currentUser: null,
		};
	}

	if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
		return {
			...state,
			isLoading: false,
			error: action.payload,
		};
	}

	return state;
};

export default userReducer;
