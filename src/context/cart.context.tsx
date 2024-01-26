import { createContext, useEffect, useState } from "react";
import { CategoryItem } from "context/products.context";

export type TCartItems = CategoryItem & { quantity: number };

export type CartContextType = {
	isCartOpen: boolean;
	setIsCartOpen: (isCartOpen: boolean | ((prevState: boolean) => boolean)) => void;
	cartItems: TCartItems[];
	addItemToCart: (item: CategoryItem) => void;
	removeItemFromCart: (item: CategoryItem) => void;
	totalQuantity: number;
	totalAmount: number;
	removeProductFromCart: (item: CategoryItem) => void;
};

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

const addCartItem = (cartItems: TCartItems[], itemToAdd: CategoryItem) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

	if (existingCartItem) {
		return cartItems.map((cartItem) => (cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
	}

	return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: TCartItems[], itemToRemove: CategoryItem) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

	if (existingCartItem) {
		if (existingCartItem.quantity === 1) {
			return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
		}
		return cartItems.map((cartItem) => (cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
	}
	return cartItems;
};

const removeCartProduct = (cartItems: TCartItems[], productToRemove: CategoryItem) => {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
	if (existingCartItem) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}
	return cartItems;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
	const [cartItems, setCartItems] = useState<TCartItems[]>([]);
	const [totalQuantity, setTotalQuantity] = useState<number>(0);
	const [totalAmount, setTotalAmount] = useState<number>(0);

	useEffect(() => {
		const calculatedTotal = cartItems.reduce(
			(total, cartItem) => {
				return {
					calculatedTotalQuantity: total.calculatedTotalQuantity + cartItem.quantity,
					calculatedTotalAmount: total.calculatedTotalAmount + cartItem.quantity * cartItem.price,
				};
			},
			{
				calculatedTotalQuantity: 0,
				calculatedTotalAmount: 0,
			}
		);
		setTotalQuantity(calculatedTotal.calculatedTotalQuantity);
		setTotalAmount(calculatedTotal.calculatedTotalAmount);
	}, [cartItems]);

	const addItemToCart = (itemToAdd: CategoryItem) => {
		setCartItems(addCartItem(cartItems, itemToAdd));
	};

	const removeItemFromCart = (itemToRemove: CategoryItem) => {
		setCartItems(removeCartItem(cartItems, itemToRemove));
	};

	const removeProductFromCart = (productToRemove: CategoryItem) => {
		setCartItems(removeCartProduct(cartItems, productToRemove));
	};

	return (
		<CartContext.Provider
			value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, totalQuantity, totalAmount, removeProductFromCart }}
		>
			{children}
		</CartContext.Provider>
	);
};
