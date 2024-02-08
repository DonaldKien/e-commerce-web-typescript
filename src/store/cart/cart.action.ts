import { CartItem, TCartItems } from "interfaces/cart";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (isCartOpen: boolean) => {
	return {
		type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
		payload: isCartOpen,
	};
};

export const addItemToCart = (cartItems: TCartItems[], itemToAdd: CartItem) => ({
	type: CART_ACTION_TYPES.SET_CART_ITEMS,
	payload: addCartItem(cartItems, itemToAdd),
});

export const removeItemFromCart = (cartItems: TCartItems[], itemToRemove: CartItem) => ({
	type: CART_ACTION_TYPES.SET_CART_ITEMS,
	payload: removeCartItem(cartItems, itemToRemove),
});

export const removeProductFromCart = (cartItems: TCartItems[], productToRemove: CartItem) => ({
	type: CART_ACTION_TYPES.SET_CART_ITEMS,
	payload: removeCartProduct(cartItems, productToRemove),
});
