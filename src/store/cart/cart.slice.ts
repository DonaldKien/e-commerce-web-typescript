import { createSlice } from "@reduxjs/toolkit";
import { CartItem, TCartItems } from "interfaces/cart";

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

export const cartSlice = createSlice({
	name: "cart",
	initialState: CART_INITIAL_VALUE,
	reducers: {
		addItemToCart: (state, action) => ({
			...state,
			...addCartItem(state.cartItems, action.payload),
		}),
		removeItemFromCart: (state, action) => ({
			...state,
			...removeCartItem(state.cartItems, action.payload),
		}),
		removeProductFromCart: (state, action) => ({
			...state,
			...removeCartProduct(state.cartItems, action.payload),
		}),
		setIsCartOpen: (state) => ({
			...state,
			isCartOpen: !state.isCartOpen,
		}),
	},
});

export const { addItemToCart, removeItemFromCart, removeProductFromCart, setIsCartOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
