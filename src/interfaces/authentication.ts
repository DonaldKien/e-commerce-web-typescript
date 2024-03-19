import { User } from "firebase/auth";

export type AuthUserValue = User;
// export type AuthUserValue = User | null;

export type EmailSignIn = {
	email: string;
	password: string;
};

export type UserSignUp = {
	email: string;
	password: string;
	displayName: string;
};

export type UserSignUpSuccess = {
	user: AuthUserValue;
	additionalDetails: any;
};
