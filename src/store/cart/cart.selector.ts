import { createSelector } from "reselect";
import { IRootState } from "store/root-reducer";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: IRootState): CartState => state.cartReducer;

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectTotalQuantity = createSelector([selectCartReducer], (cart) => cart.totalQuantity);

export const selectTotalAmount = createSelector([selectCartReducer], (cart) => cart.totalAmount);
