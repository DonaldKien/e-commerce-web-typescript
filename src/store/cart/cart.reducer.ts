import { TCartItems } from "interfaces/cart";
import { CART_ACTION_TYPES } from "./cart.types";

type CartReducerAction = {
	type: CART_ACTION_TYPES;
	payload: CartReducerValue;
};

type CartReducerValue = {
	cartItems: TCartItems[];
	totalQuantity: number;
	totalAmount: number;
	isCartOpen: boolean;
};

const CART_INITIAL_VALUE: CartReducerValue = {
	cartItems: [],
	totalQuantity: 0,
	totalAmount: 0,
	isCartOpen: false,
};

const cartReducer = (state = CART_INITIAL_VALUE, action: CartReducerAction) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			return state;
	}
};

export default cartReducer;
