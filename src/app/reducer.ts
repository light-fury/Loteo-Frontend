import {State} from "app/types";
import {LOCATION_CHANGE} from "connected-react-router";
import reduceReducers from "reduce-reducers";

import * as types from "app/actionTypes";

export const initialState: State = {
    currentPath: null,
    previousPath: null,
    errors: []
};

export default reduceReducers(
    (state: State = initialState, action: any) => {
        switch (action.type) {
            case LOCATION_CHANGE: {
                return {
                    ...state,
                    previousPath: state.currentPath === action.payload.location.pathname ? state.previousPath : state.currentPath,
                    currentPath: action.payload.location.pathname
                };
            }
            case types.CLEAR_PATHS: {
                return {
                    ...state,
                    previousPath: null,
                    currentPath: null
                };
            }
            case types.SET_ERRORS: {
                return {
                    ...state,
                    errors: action.errors
                };
            }
            case types.CLEAR_ERRORS: {
                return {
                    ...state,
                    errors: []
                };
            }

            default: {
                return state;
            }
        }
    }
);
