import { CartItem, CartItemsWithQuantityAndAmount, TCartItems, TotalCartQuantityAndAmount } from "interfaces/cart";
import { CART_ACTION_TYPES } from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "utils/reducer/reducer.utils";

const totalQuantityAndAmountCalc = (cartItems: TCartItems[]): TotalCartQuantityAndAmount => {
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

const addCartItem = (cartItems: TCartItems[], itemToAdd: CartItem): CartItemsWithQuantityAndAmount => {
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

const removeCartItem = (cartItems: TCartItems[], itemToRemove: CartItem): CartItemsWithQuantityAndAmount => {
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

const removeCartProduct = (cartItems: TCartItems[], productToRemove: CartItem): CartItemsWithQuantityAndAmount => {
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

type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

type SetCartItemsAction = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItemsWithQuantityAndAmount>;

export const setIsCartOpen = withMatcher((isCartOpen: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));

export const setCartItems = withMatcher((newCartItems: CartItemsWithQuantityAndAmount): SetCartItemsAction => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems));

export const addItemToCart = (cartItems: TCartItems[], itemToAdd: CartItem) => {
	const newCartItems = addCartItem(cartItems, itemToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: TCartItems[], itemToRemove: CartItem) => {
	const newCartItems = removeCartItem(cartItems, itemToRemove);
	return setCartItems(newCartItems);
};

export const removeProductFromCart = (cartItems: TCartItems[], productToRemove: CartItem) => {
	const newCartItems = removeCartProduct(cartItems, productToRemove);
	return setCartItems(newCartItems);
};
