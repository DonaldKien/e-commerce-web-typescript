import { FC } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";
import { CategoryItem } from "interfaces/categories";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "store/cart/cart.action";
import { selectCartItems } from "store/cart/cart.selector";

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addProductToCart = () => {
		dispatch(addItemToCart(cartItems, product));
	};

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
				Add to cart
			</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
