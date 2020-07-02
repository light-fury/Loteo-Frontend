import {ThunkDispatch} from "redux-thunk";

import * as types from "loteo/actionTypes";

import {getWallet} from "loteo/api";
import {handleError} from "app/actions";
import {Wallet} from "loteo/types";
import {AnyAction} from "redux";

const toLoteoPass = loteoPassResponse => ({
    ...loteoPassResponse,
    validUntil: new Date(loteoPassResponse.validUntil)
});

export const toWallet = (walletResponse): Wallet => ({
    ...walletResponse,
    loteoPasses: (walletResponse.loteoPasses || []).map(toLoteoPass),
    transactions: walletResponse.transactions || []
});

export const loadWallet = () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
        type: types.LOAD_WALLET
    });

    try {
        const wallet = await getWallet();

        dispatch({
            type: types.SET_WALLET,
            wallet: toWallet(wallet)
        });
    } catch (error) {
        switch (error.status) {
            case 404:
                // expected use case where user wallet is still initializing - we try again
                setTimeout(() => {
                    dispatch(loadWallet());
                }, 1000);
                break;
        }
        handleError(dispatch, error);
    }
};
