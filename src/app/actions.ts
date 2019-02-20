import {SHOW_ERROR_DETAILS} from "config";
import * as types from "app/actionTypes";

export const setErrors = (dispatch: Function, ...errors: string[]) => {
    if (SHOW_ERROR_DETAILS) {
        // eslint-disable-next-line no-console
        errors.forEach(console.error);
    }

    dispatch({
        type: types.SET_ERRORS,
        errors
    });
};

export const clearErrors = () => ({
    type: types.CLEAR_ERRORS
});

export const clearPaths = () => ({
    type: types.CLEAR_PATHS
});
