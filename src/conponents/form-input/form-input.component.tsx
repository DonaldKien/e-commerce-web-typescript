import { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	const shouldLabelShrink: boolean = Boolean(otherProps.value && typeof otherProps.value === "string" && otherProps.value.length);
	return (
		<Group>
			<Input {...otherProps} />
			{label && <FormInputLabel shrink={shouldLabelShrink}>{label}</FormInputLabel>}
		</Group>
	);
};

export default FormInput;
