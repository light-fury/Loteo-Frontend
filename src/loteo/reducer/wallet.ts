import * as types from "loteo/actionTypes";

import {State} from "loteo/types";

export const initialState = {
    wallet: null,
    walletLoading: false
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_WALLET:
            return updateState({
                walletLoading: true
            });

        case types.SET_WALLET:
            return updateState({
                walletLoading: false,
                wallet: action.wallet
            });

        default:
            return state;
    }
};
