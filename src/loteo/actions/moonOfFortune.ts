import {Dispatch} from "redux";

import * as types from "loteo/actionTypes";

import {getMOFSettings, getMOF24HVolume} from "loteo/api";
import {handleError} from "app/actions";

export const loadMOFSettings = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.LOAD_MOF_SETTINGS
    });

    try {
        const settings = await getMOFSettings();

        dispatch({
            type: types.SET_MOF_SETTINGS,
            settings
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};

export const loadMOF24HVolume = () => async (dispatch: Dispatch) => {
    try {
        const mof24HVolumes = await getMOF24HVolume();

        dispatch({
            type: types.SET_MOF_24H_VOLUME,
            mof24HVolumes
        });
    } catch (error) {
        handleError(dispatch, error);
    }
};
