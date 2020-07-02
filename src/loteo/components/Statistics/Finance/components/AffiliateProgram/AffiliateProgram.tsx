import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Grid} from "ui/components";
import {
    StatisticsSubHeader as SubHeader,
    AffiliateCard
} from "loteo/components";
import {StatisticsAffiliateSpace, StatisticsFilter} from "loteo/types";
import {loadStatisticsAffiliateSpace} from "loteo/actions";
import {useReduxStore} from "hooks";
import {getStatisticsAffiliateSpace} from "loteo/selectors";

import "./affiliateProgram.scss";


type Props = {
    className?: string;
    loadStatisticsAffiliateSpace(string);
};


const AffiliateProgram = ({className, loadStatisticsAffiliateSpace}: Props) => {
    const [currentFilter, setCurrentFilter] = useState(2);
    const [affiliate]: [StatisticsAffiliateSpace[] | null] = useReduxStore([getStatisticsAffiliateSpace]);

    const handleChangeFilter = (category) => {
        loadStatisticsAffiliateSpace(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadStatisticsAffiliateSpace("monthly");
    }, []);

    return (
        <div className={`affiliateProgram ${className}`}>
            <SubHeader title="Affiliate space program" active={currentFilter} onChange={handleChangeFilter} filter/>
            <Grid className="content" justify="space-between" noWidth noPadding>
                <AffiliateCard
                    percent={affiliate ? affiliate[0].percentage : 0}
                    value={affiliate ? affiliate[0].rewardEth : 0}
                    currency="ETH"
                />
                <AffiliateCard
                    percent={affiliate ? affiliate[1].percentage : 0}
                    value={affiliate ? affiliate[1].rewardEth : 0}
                    currency="ETH"
                />
                <AffiliateCard
                    percent={affiliate ? affiliate[2].percentage : 0}
                    value={affiliate ? affiliate[2].rewardEth : 0}
                    currency="ETH"
                />
            </Grid>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsAffiliateSpace
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(AffiliateProgram);
