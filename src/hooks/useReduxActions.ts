import {useContext} from "react";
import {ReactReduxContext} from "react-redux";

export default (actions) => {
    const {store} = useContext(ReactReduxContext);
    const {dispatch} = store;

    return actions.map(action => (...args) => dispatch(action(...args)));
};
