import {Dispatch} from "redux";

import * as types from "loteo/actionTypes";

import {getNews} from "loteo/api";
import {handleError} from "app/actions";

export const loadNews = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_NEWS
    });

    try {
        const news = await getNews();

        dispatch({
            type: types.SET_NEWS,
            news
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};
