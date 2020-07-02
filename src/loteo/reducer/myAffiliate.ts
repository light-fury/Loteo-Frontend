import * as types from "loteo/actionTypes";

import {State} from "loteo/types";

export const initialState = {
    myAffiliate: null,
    myAffiliateLoading: false
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_MY_AFFILIATE:
            return updateState({
                myAffiliateLoading: true
            });

        case types.SET_MY_AFFILIATE:
            return updateState({
                myAffiliateLoading: false,
                myAffiliate: action.myAffiliate
            });

        default:
            return state;
    }
};
