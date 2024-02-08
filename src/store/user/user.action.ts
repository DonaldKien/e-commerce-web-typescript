import { USER_ACTION_TYPES } from "./user.types";
import { AuthUserValue } from "interfaces/authentication";

export const setCurrentUser = (user: AuthUserValue) => ({
	type: USER_ACTION_TYPES.SET_CURRENT_USER,
	payload: user,
});
