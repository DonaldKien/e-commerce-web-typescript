import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { CartContext } from "context/cart.context";

const CartIcon = () => {
	const { setIsCartOpen, totalQuantity } = useContext(CartContext);

	const toggleIsCartOpen = () => {
		setIsCartOpen((prevState: boolean) => !prevState);
	};

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount>{totalQuantity}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
