import {StoreState, User} from "auth/types";

export const getUser = (state: StoreState): User | null => state.auth.user;

export const getUserLoading = (state: StoreState): boolean => state.auth.userLoading;
