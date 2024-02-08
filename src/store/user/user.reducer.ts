import { USER_ACTION_TYPES } from "./user.types";
import { AuthUserValue } from "interfaces/authentication";

type UserReducerState = {
	currentUser: AuthUserValue;
};

type UserReducerAction = {
	type: USER_ACTION_TYPES;
	payload: AuthUserValue;
};

const USER_INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state: UserReducerState = USER_INITIAL_STATE, action: UserReducerAction) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			return state;
	}
};

export default userReducer;
