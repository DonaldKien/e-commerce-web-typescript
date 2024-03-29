import FormInput from "conponents/form-input/form-input.component";
import { SignInContainer } from "./sign-in-form.styles";
import { ChangeEvent, useState } from "react";
import { ButtonsContainer } from "conponents/form-input/form-input.styles";
import Button, { BUTTON_TYPE_CLASSES } from "conponents/button/button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart, signInFailed } from "store/user/user.action";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const dispatch = useDispatch();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormFields((prev) => ({ ...prev, [name]: value }));
	};

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			dispatch(emailSignInStart(email, password));
			setFormFields(defaultFormFields);
		} catch (error: any) {
			dispatch(signInFailed(error));
		}
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
				<FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>
						Sign In With Google
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
