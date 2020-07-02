import {Dispatch} from "redux";

import * as types from "loteo/actionTypes";

import {getMyAffiliate} from "loteo/api";
import {handleError} from "app/actions";

export const loadMyAffiliate = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_MY_AFFILIATE
    });

    try {
        const myAffiliate = await getMyAffiliate();

        dispatch({
            type: types.SET_MY_AFFILIATE,
            myAffiliate
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};
