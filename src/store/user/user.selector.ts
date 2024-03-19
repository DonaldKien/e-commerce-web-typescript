import { IRootState } from "store/root-reducer";
import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: IRootState): UserState => state.user;

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser);
