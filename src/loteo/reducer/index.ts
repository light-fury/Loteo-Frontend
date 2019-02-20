import reduceReducers from "reduce-reducers";
import {Action} from "redux";

import {State} from "loteo/types";

export const initialState: State = {
};

export default reduceReducers(
    (state: State = initialState, action: Action) => {
        switch (action.type) {
            default: {
                return state;
            }
        }
    }
);
