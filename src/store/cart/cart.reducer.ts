import { TCartItems, CartItem } from "interfaces/cart";
import { CART_ACTION_TYPES } from "./cart.types";

type CartReducerAction = {
	type: CART_ACTION_TYPES;
	payload: CartItem;
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

const totalQuantityAndAmountCalc = (cartItems: TCartItems[]) => {
	const calculatedTotal = cartItems.reduce(
		(total, cartItem) => {
			return {
				totalQuantity: total.totalQuantity + cartItem.quantity,
				totalAmount: total.totalAmount + cartItem.quantity * cartItem.price,
			};
		},
		{
			totalQuantity: 0,
			totalAmount: 0,
		}
	);
	return calculatedTotal;
};

const cartReducer = (state = CART_INITIAL_VALUE, action: CartReducerAction) => {
	const { type, payload } = action;
	switch (type) {

		case CART_ACTION_TYPES.ADD_CART_ITEM:
			const addCartItem = (cartItems: TCartItems[], itemToAdd: CartItem) => {
				const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);
				let newCartItems: TCartItems[] = [];
				if (existingCartItem) {
					newCartItems = cartItems.map((cartItem) => (cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
				} else {
					newCartItems = [...cartItems, { ...itemToAdd, quantity: 1 }];
				}
				return {
					cartItems: newCartItems,
					...totalQuantityAndAmountCalc(newCartItems),
				};
			};
			return {
				...state,
				...addCartItem(state.cartItems, payload),
			};

		case CART_ACTION_TYPES.REMOVE_CART_ITEM:
			const removeCartItem = (cartItems: TCartItems[], itemToRemove: CartItem) => {
				const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);
				let newCartItems: TCartItems[] = [];
				if (existingCartItem) {
					if (existingCartItem.quantity === 1) {
						newCartItems = cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
					} else {
						newCartItems = cartItems.map((cartItem) =>
							cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
						);
					}
				}
				return {
					cartItems: newCartItems,
					...totalQuantityAndAmountCalc(newCartItems),
				};
			};
			return {
				...state,
				...removeCartItem(state.cartItems, payload),
			};

		case CART_ACTION_TYPES.REMOVE_CART_PRODUCT:
			const removeCartProduct = (cartItems: TCartItems[], productToRemove: CartItem) => {
				const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
				let newCartItems: TCartItems[] = [];
				if (existingCartItem) {
					newCartItems = cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
				} else {
					newCartItems = cartItems;
				}
				return {
					cartItems: newCartItems,
					...totalQuantityAndAmountCalc(newCartItems),
				};
			};
			return {
				...state,
				...removeCartProduct(state.cartItems, payload),
			}

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
