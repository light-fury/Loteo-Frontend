import {Dispatch} from "redux";

import * as types from "auth/actionTypes";

import * as api from "auth/api";
import {removeItem} from "common/storage";
import {ACCESS_TOKEN_KEY} from "auth/constants";
import {handleError} from "app/actions";
import {User} from "auth/types";

export const logout = () => async () => {
    try {
        localStorage.removeItem("currentBoarding");
        await api.logout();
    } finally {
        removeItem(ACCESS_TOKEN_KEY);
    }
};

export const setUser = (user: User) => ({
    type: types.SET_USER,
    user
});

export const loadUser = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_USER
    });

    try {
        const user = await api.getUser();
        dispatch(setUser(user));
    } catch (error) {
        switch (error.status) {
            case 401:
                // 401 is expected when user is not logged in
                break;
            default:
                handleError(dispatch, error);
        }
    }
};
