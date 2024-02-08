import { FC } from "react";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { TCartItems } from "interfaces/cart";

type CartItemProps = {
	cartItem: TCartItems;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
