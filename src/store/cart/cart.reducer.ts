import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { CartItemsWithQuantityAndAmount } from "interfaces/cart";
import { ReadonlyIntersection } from "interfaces/utils";

export type CartState = ReadonlyIntersection<CartItemsWithQuantityAndAmount, { isCartOpen: boolean }>;

const CART_INITIAL_VALUE: CartState = {
	cartItems: [],
	totalQuantity: 0,
	totalAmount: 0,
	isCartOpen: false,
};

const cartReducer = (state = CART_INITIAL_VALUE, action: AnyAction): CartState => {
	if (setIsCartOpen.match(action)) {
		return { ...state, isCartOpen: action.payload };
	}

	if (setCartItems.match(action)) {
		return { ...state, ...action.payload };
	}

	return state;
};

export default cartReducer;
