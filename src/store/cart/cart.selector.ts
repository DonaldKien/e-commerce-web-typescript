import { createSelector } from "reselect";
import { IRootState } from "store/root-reducer";

const selectCartReducer = (state: IRootState) => state.cartReducer;

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectTotalQuantity = createSelector([selectCartReducer], (cart) => cart.totalQuantity);

export const selectTotalAmount = createSelector([selectCartReducer], (cart) => cart.totalAmount);
