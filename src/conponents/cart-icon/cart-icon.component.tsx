import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity } from "store/cart/cart.selector";
import { setIsCartOpen } from "store/cart/cart.slice";

const CartIcon = () => {
	const totalQuantity = useSelector(selectTotalQuantity);
	const dispatch = useDispatch();

	const toggleIsCartOpen = () => {
		dispatch(setIsCartOpen());
	};

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount>{totalQuantity}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
