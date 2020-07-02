import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import {loadConversionRates} from "loteo/actions";
import {useInterval} from "hooks";
import {useEffect} from "react";

type Props = {
    loadConversionRates();
};

const DataLoader = ({loadConversionRates}: Props) => {
    useEffect(() => {
        loadConversionRates();
    }, [loadConversionRates]);

    useInterval(() => {
        loadConversionRates();
    }, 6 * 1000);

    return null;
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadConversionRates
}, dispatch);

export default connect(null, mapDispatchToProps)(DataLoader);
