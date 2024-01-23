import { FC } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";

type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { name, price, imageUrl } = product;

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to card</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
