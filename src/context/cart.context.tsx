import { createContext, useState, useReducer } from "react";
import { CategoryItem } from "context/products.context";

type CartContextTypeValue = {
	cartItems: TCartItems[];
	totalQuantity: number;
	totalAmount: number;
};

const INITIAL_VALUE: CartContextTypeValue = {
	cartItems: [],
	totalQuantity: 0,
	totalAmount: 0,
};

export type TCartItems = CategoryItem & { quantity: number };

export type CartContextType = {
	setIsCartOpen: (isCartOpen: boolean | ((prevState: boolean) => boolean)) => void;
	addItemToCart: (item: CategoryItem) => void;
	removeItemFromCart: (item: CategoryItem) => void;
	removeProductFromCart: (item: CategoryItem) => void;
	isCartOpen?: boolean;
} & CartContextTypeValue;

export const CartContext = createContext<CartContextType>({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	totalQuantity: 0,
	totalAmount: 0,
	removeProductFromCart: () => {},
});

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

const addCartItem = (cartItems: TCartItems[], itemToAdd: CategoryItem) => {
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

const removeCartItem = (cartItems: TCartItems[], itemToRemove: CategoryItem) => {
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

const removeCartProduct = (cartItems: TCartItems[], productToRemove: CategoryItem) => {
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

enum CART_ACTION_TYPES {
	SET_CART_ITEMS = "SET_CART_ITEMS",
}

const cartReducer = (state: typeof INITIAL_VALUE, action: { type: keyof typeof CART_ACTION_TYPES; payload: CartContextTypeValue }) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
	const [{ cartItems, totalQuantity, totalAmount }, dispatch] = useReducer(cartReducer, INITIAL_VALUE);

	const addItemToCart = (itemToAdd: CategoryItem) => {
		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: addCartItem(cartItems, itemToAdd),
		});
	};

	const removeItemFromCart = (itemToRemove: CategoryItem) => {
		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: removeCartItem(cartItems, itemToRemove),
		});
	};

	const removeProductFromCart = (productToRemove: CategoryItem) => {
		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: removeCartProduct(cartItems, productToRemove),
		});
	};

	return (
		<CartContext.Provider
			value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, totalQuantity, totalAmount, removeProductFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
};
