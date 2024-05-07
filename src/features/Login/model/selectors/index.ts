import { RootState } from "app/providers/StoreProvider";

export const getUserRole = (state: RootState) => state.login.userData?.role;
