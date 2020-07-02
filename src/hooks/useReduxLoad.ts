import {useContext, useEffect} from "react";
import {ReactReduxContext} from "react-redux";

export default (loadActions, selectors) => {
    const {store, storeState} = useContext(ReactReduxContext);
    const {dispatch} = store;

    useEffect(() => {
        loadActions.forEach(dispatch);
    }, []);

    return selectors.map(selector => selector(storeState))
        .concat(loadActions.map(loadAction => () => dispatch(loadAction)));
};
