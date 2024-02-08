import { FC } from "react";
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from "./checkout-item.styles";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart, removeProductFromCart } from "store/cart/cart.action";
import { selectCartItems } from "store/cart/cart.selector";
import { TCartItems } from "interfaces/cart";

type CheckoutItemProps = {
	cartItem: TCartItems;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addItemHandler = () => {
		dispatch(addItemToCart(cartItems, cartItem));
	};
	const removeItemHandler = () => {
		dispatch(removeItemFromCart(cartItems, cartItem));
	};

	const clearItemHandler = () => {
		dispatch(removeProductFromCart(cartItems, cartItem));
	};

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan> {name} </BaseSpan>
			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan> {price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
