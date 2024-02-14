import { USER_ACTION_TYPES } from "./user.types";
import { AuthUserValue } from "interfaces/authentication";

type UserReducerState = {
	currentUser: AuthUserValue;
};

type UserError = any;

type UserReducerAction = {
	type: USER_ACTION_TYPES;
	payload: AuthUserValue | UserError;
};

const USER_INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

const userReducer = (state: UserReducerState = USER_INITIAL_STATE, action: UserReducerAction) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SIGN_UP_START:
		case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
		case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
			return {
				...state,
				currentUser: null,
				isLoading: true,
			};
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentUser: payload,
			};
		case USER_ACTION_TYPES.SIGN_OUT_START:
			return {
				...state,
				isLoading: true,
			};
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentUser: null,
			};
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export default userReducer;
