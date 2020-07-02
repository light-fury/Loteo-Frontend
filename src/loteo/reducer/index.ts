import reduceReducers from "reduce-reducers";

import {State} from "loteo/types";

import lottery, {initialState as lotteryInitialState} from "./lottery";
import news, {initialState as newsInitialState} from "./news";
import wallet, {initialState as walletInitialState} from "./wallet";
import myAffiliate, {initialState as myAffiliateInitialState} from "./myAffiliate";
import moonOfFortune, {initialState as moonOfFortuneInitialState} from "./moonOfFortune";

export const initialState: State = {
    ...lotteryInitialState,
    ...newsInitialState,
    ...walletInitialState,
    ...myAffiliateInitialState,
    ...moonOfFortuneInitialState
};

export default reduceReducers(
    (state: State = initialState, action: any) => {
        switch (action.type) {
            default: {
                return state;
            }
        }
    },
    lottery,
    news,
    wallet,
    myAffiliate,
    moonOfFortune
);
