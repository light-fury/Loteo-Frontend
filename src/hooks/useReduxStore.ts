import {useContext} from "react";
import {ReactReduxContext} from "react-redux";

export default (selectors) => {
    const {storeState} = useContext(ReactReduxContext);
    return selectors.map(selector => selector(storeState));
};
