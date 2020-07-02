import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    Trend,
    UserCard,
    StatisticsSubHeader as SubHeader
} from "loteo/components";
import {StatisticsWebVistors,StatisticsFilter} from "loteo/types";
import {loadWebVistors} from "loteo/actions";
import {useReduxStore} from "hooks";
import {getStatisticsWebVistors} from "loteo/selectors";

import "./webVistor.scss";

type Props = {
    loadWebVistors(string);
};

const WebVistor = ({loadWebVistors}: Props) => {
    const [currentFilter, setCurrentFilter] = useState(0);
    const [vistors]: [StatisticsWebVistors | null] = useReduxStore([getStatisticsWebVistors]);

    const handleChangeFilter = (category) => {
        loadWebVistors(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadWebVistors("daily");
    }, []);

    return (
        <div className="webVistor">
            <SubHeader title="Web Vistors" active={currentFilter} onChange={handleChangeFilter} filter/>
            <Trend className="trend">
                <UserCard type="Vistors" users={vistors ? vistors.webVistors : 0} reverse />
                <UserCard type="Unique visitors" users={vistors ? vistors.uniqueVistors : 0} reverse />
                <UserCard type="Refferals" users={vistors ? vistors.referral : 0} reverse />
                <UserCard type="Direct" users={vistors ? vistors.webVistors : 0} reverse />
                <UserCard type="Social media" users={vistors ? vistors.direct : 0} reverse />
                <UserCard type="Organic" users={vistors ? vistors.organic : 0} reverse />
                <UserCard type="Other" users={vistors ? vistors.bounces : 0} reverse />
            </Trend>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadWebVistors
        },
        dispatch
    );


export default connect(
    null,
    mapDispatchToProps
)(WebVistor);

