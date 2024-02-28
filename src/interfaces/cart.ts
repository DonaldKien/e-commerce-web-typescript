import { CategoryItem } from "./categories";

export type TCartItems = CategoryItem & { quantity: number };

export type CartItem = CategoryItem;

export type TotalCartQuantityAndAmount = {
	totalQuantity: number;
	totalAmount: number;
};

export type CartItemsWithQuantityAndAmount = TotalCartQuantityAndAmount & {
	cartItems: TCartItems[];
};
