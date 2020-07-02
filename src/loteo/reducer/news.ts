import * as types from "loteo/actionTypes";

import {State} from "loteo/types";

export const initialState = {
    news: ["Loading news...", "Loading news...", "Loading news...", "Loading news...", "Loading news..."],
    newsLoading: false
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_NEWS:
            return updateState({
                newsLoading: true
            });

        case types.SET_NEWS:
            return updateState({
                newsLoading: false,
                news: action.news
            });

        default:
            return state;
    }
};
