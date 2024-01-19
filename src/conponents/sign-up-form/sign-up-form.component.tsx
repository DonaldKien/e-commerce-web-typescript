import FormInput from "conponents/form-input/form-input.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { useState } from "react";
import Button from "conponents/button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "utils/firebase/firebase.utils";
import { UserCredential } from "firebase/auth";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}
		try {
			const response: UserCredential | undefined = await createAuthUserWithEmailAndPassword(email, password);
			if (response?.user) {
				await createUserDocumentFromAuth(response.user, { displayName });
				setFormFields(defaultFormFields);
			}
		} catch (error: any) {
			switch (error.code) {
				case "auth/email-already-in-use":
					alert("Cannot create user, email already in use");
					break;
				case "auth/invalid-email":
					alert("Cannot create user, invalid email");
					break;
				case "auth/operation-not-allowed":
					alert("Cannot create user, email already in use");
					break;
				case "auth/weak-password":
					alert("Cannot create user, weak password");
					break;
				case "auth/wrong-password":
					alert("Cannot create user, wrong password");
					break;
				default:
					console.log("user creation error: ", error);
					break;
			}
		}
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName} />
				<FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email} />
				<FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password} />
				<FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword} />
				<Button type="submit">Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
