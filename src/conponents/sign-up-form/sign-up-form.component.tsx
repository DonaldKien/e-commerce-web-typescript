import FormInput from "conponents/form-input/form-input.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { useState } from "react";
import Button from "conponents/button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const dispatch = useDispatch();

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
			dispatch(signUpStart(email, password, displayName));
			setFormFields(defaultFormFields);
		} catch (error) {
			if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert("Cannot create user, email already in use");
			} else {
				console.log("user creation error: ", error);
			}
		}
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					required
					name="displayName"
					onChange={handleChange}
					value={displayName}
				/>
				<FormInput
					label="Email"
					type="email"
					required
					name="email"
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					name="password"
					onChange={handleChange}
					value={password}
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					required
					name="confirmPassword"
					onChange={handleChange}
					value={confirmPassword}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
