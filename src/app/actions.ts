import {Dispatch} from "redux";

import {SHOW_ERROR_DETAILS} from "config";
import * as types from "app/actionTypes";
import {login} from "auth/api";

export const handleError = (dispatch: Dispatch, error: any) => {
    switch (error.status) {
        case 401:
            login(window.location.pathname, true);
            break;
        default:
            if (error.response) {
                if (error.response.errors) {
                    setErrors(dispatch, error.response.errors.map(error => error.message || error.error || error.toString()));
                }
            } else if (error.statusText) {
                setErrors(dispatch, `${error.status}: ${error.statusText}`);
            } else {
                setErrors(dispatch, error.toString());
            }
    }
};

export const setErrors = (dispatch: Dispatch, ...errors: string[]) => {
    if (SHOW_ERROR_DETAILS) {
        // eslint-disable-next-line no-console
        errors
            .filter(error => !!error)
            .forEach(console.error);
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
