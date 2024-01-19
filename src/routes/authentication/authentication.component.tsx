import SignInForm from "conponents/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.styles";
import SignUpForm from "conponents/sign-up-form/sign-up-form.component";

const Authentication = () => {
	return (
		<AuthenticationContainer>
			<SignInForm />
			<SignUpForm />
		</AuthenticationContainer>
	);
};

export default Authentication;
