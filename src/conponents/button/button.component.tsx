import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton } from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
	base = "base",
	google = "google-sign-in",
	inverted = "inverted",
}

type ButtonProps = {
	buttonType?: BUTTON_TYPE_CLASSES;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</CustomButton>
	);
};

export default Button;