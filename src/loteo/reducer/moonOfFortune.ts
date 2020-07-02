import * as types from "loteo/actionTypes";

import {State} from "loteo/types";

export const initialState = {
    MOFSettings: null,
    MOF24HVolume: null,
    MOFSettingsLoading: false
};

export default (state: State, action: any): State => {
    const updateState = newValues => ({
        ...state,
        ...newValues
    });

    switch (action.type) {
        case types.LOAD_MOF_SETTINGS:
            return updateState({
                MOFSettingsLoading: true
            });

        case types.SET_MOF_SETTINGS:
            return updateState({
                MOFSettingsLoading: false,
                MOFSettings: action.settings
            });

        case types.SET_MOF_24H_VOLUME:
                return updateState({
                    MOF24HVolume: action.mof24HVolumes
                });

        default:
            return state;
    }
};
