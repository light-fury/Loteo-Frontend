import {StoreState} from "app/types";

export const getPreviousPath = (state: StoreState) => state.app.previousPath;

export const getCurrentPath = (state: StoreState) => state.app.currentPath;

export const getErrors = (state: StoreState) => state.app.errors;
