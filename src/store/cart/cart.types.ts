import { TCartItems } from "interfaces/cart";

export enum CART_ACTION_TYPES {
	SET_CART_ITEMS = "cart/SET_CART_ITEMS",
	SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
}

export type TotalCartQuantityAndAmount = {
	totalQuantity: number;
	totalAmount: number;
};

export type CartItemsWithQuantityAndAmount = TotalCartQuantityAndAmount & {
	cartItems: TCartItems[];
};
