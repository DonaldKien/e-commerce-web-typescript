import { IRootState } from "store/root-reducer";

export const selectCurrentUser = (state: IRootState) => state.user.currentUser;
