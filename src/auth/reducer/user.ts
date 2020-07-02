import * as types from "auth/actionTypes";

import {State} from "auth/types";

export const initialState = {
    user: null,
    userLoading: false
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_USER:
            return updateState({
                userLoading: true
            });

        case types.SET_USER:
            return updateState({
                userLoading: false,
                user: action.user
            });

        default:
            return state;
    }
};
