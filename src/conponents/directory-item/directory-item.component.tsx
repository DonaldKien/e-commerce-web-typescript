import { FC } from "react";
import { DirectoryCategory } from "conponents/directory/directory.component";
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

type DirectoryItemProps = { category: DirectoryCategory };

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { title, imageUrl, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate(route);
	};

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
