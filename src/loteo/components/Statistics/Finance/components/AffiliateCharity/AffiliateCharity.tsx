import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Grid} from "ui/components";
import {
    Trend,
    TrendCard,
    StatisticsSubHeader as SubHeader
} from "loteo/components";
import {StatisticsAffiliateCharity, StatisticsFilter} from "loteo/types";
import {loadStatisticsAffiliateCharity} from "loteo/actions";
import {useReduxStore} from "hooks";
import {getStatisticsAffiliateCharity} from "loteo/selectors";

import "./affiliateCharity.scss";


type Props = {
    className?: string;
    loadStatisticsAffiliateCharity(string);
};


const AffiliateCharity = ({className, loadStatisticsAffiliateCharity}: Props) => {
    const [currentFilter, setCurrentFilter] = useState(3);
    const [charity]: [StatisticsAffiliateCharity | null] = useReduxStore([getStatisticsAffiliateCharity]);

    const handleChangeFilter = (category) => {
        loadStatisticsAffiliateCharity(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadStatisticsAffiliateCharity("total");
    }, []);

    return (
        <div className={`affiliateCharity ${className}`}>
            <SubHeader title="Affiliate & Charity Profits" active={currentFilter} onChange={handleChangeFilter} filter/>
            <Grid className="content" noWidth noPadding>
                <Trend className="trend" backgroundImg="affiliate-profit.png">
                    <TrendCard name="Affiliate profit" value={charity ? charity.affiliateProfit : 0} currency="€"/>
                </Trend>
                <Trend className="trend" backgroundImg="charity-profit.png">
                    <TrendCard name="Charity profit" value={charity ? charity.charityProfit : 0} currency="€"/>
                </Trend>
            </Grid>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsAffiliateCharity
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(AffiliateCharity);
