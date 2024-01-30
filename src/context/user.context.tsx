import { User } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "utils/firebase/firebase.utils";

type AuthUserValue = User | null;

type UserReducerState = {
	currentUser: AuthUserValue;
};

type UserContextType = {
	currentUser: AuthUserValue;
};

enum USER_ACTION_TYPES {
	SET_CURRENT_USER = "SET_CURRENT_USER",
}

type UserReducerAction = {
	type: USER_ACTION_TYPES;
	payload: AuthUserValue;
};

export const UserContext = createContext<UserContextType>({
	currentUser: null,
});

const USER_INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state: UserReducerState, action: UserReducerAction) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const UserProvider = ({ children }: any) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user: AuthUserValue) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch({
				type: USER_ACTION_TYPES.SET_CURRENT_USER,
				payload: user,
			});
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
