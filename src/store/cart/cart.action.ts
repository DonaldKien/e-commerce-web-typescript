import { CartItem } from "interfaces/cart";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOpen: boolean) => {
	return {
		type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
		payload: isCartOpen,
	};
};

export const addItemToCart = (itemToAdd: CartItem) => ({
	type: CART_ACTION_TYPES.ADD_CART_ITEM,
	payload: itemToAdd,
});

export const removeItemFromCart = (itemToRemove: CartItem) => ({
	type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
	payload: itemToRemove,
});

export const removeProductFromCart = (productToRemove: CartItem) => ({
	type: CART_ACTION_TYPES.REMOVE_CART_PRODUCT,
	payload: productToRemove,
});
