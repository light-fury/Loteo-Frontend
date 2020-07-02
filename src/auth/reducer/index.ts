import reduceReducers from "reduce-reducers";

import {State} from "auth/types";

import user, {initialState as userInitialState} from "./user";

export const initialState: State = {
    ...userInitialState
};

export default reduceReducers(
    (state: State = initialState, action: any) => {
        switch (action.type) {
            default: {
                return state;
            }
        }
    },
    user
);
