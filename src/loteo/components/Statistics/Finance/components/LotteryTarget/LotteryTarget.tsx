import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Grid} from "ui/components";
import {
    StatisticsHeader as Header,
    ProgressBar
} from "loteo/components";
import {StatisticsLotteryTarget, StatisticsFilter} from "loteo/types";
import {loadStatisticsLotteryTarget} from "loteo/actions";
import {useReduxStore} from "hooks";
import {getStatisticsLotteryTarget} from "loteo/selectors";
import {getNumberFormattedString} from "common/utils";

import "./lotteryTarget.scss";


type Props = {
    className?: string;
    loadStatisticsLotteryTarget(string);
};


const LotteryTarget = ({className, loadStatisticsLotteryTarget}: Props) => {
    const [currentFilter, setCurrentFilter] = useState(0);
    const [target]: [StatisticsLotteryTarget | null] = useReduxStore([getStatisticsLotteryTarget]);

    const handleChangeFilter = (category) => {
        loadStatisticsLotteryTarget(category);
        StatisticsFilter.forEach((item) =>
            category === item.name ? setCurrentFilter(item.key) : currentFilter
        );
    };

    useEffect(() => {
        loadStatisticsLotteryTarget("daily");
    }, []);

    return (
        <div>
            <Header title="Finance" active={currentFilter} onChange={handleChangeFilter}/>
            <div className={`${className} finance__content`}>
                <Grid justify="space-between" align="center" wrap noPadding noWidth>
                    <Grid className="finance__content__progress" direction="column" noPadding noWidth>
                        <div className="progress1">
                            <ProgressBar
                                min={0}
                                max={target ? target.weeklyLotteryTarget : 0}
                                initial={target ? target.weeklyLotteryPrize : 0}
                                target={`${target ? getNumberFormattedString(target.weeklyLotteryTarget) : 0} € Weekly Target`}
                                percent={5}
                                leftValue="0 €"
                                rightValue={`${target ? getNumberFormattedString(target.weeklyLotteryTarget): "-"} €`}
                                usedColor="red"
                            />
                        </div>
                        <div className="progress2">
                            <ProgressBar
                                min={0}
                                max={target ? target.apollo11LotteryTarget : 0}
                                initial={target ? target.apollo11LotteryPrize : 0}
                                target={`${target ? getNumberFormattedString(target.apollo11LotteryTarget) : 0} LOTEU Weekly Target`}
                                percent={20}
                                leftValue="0 €"
                                rightValue={`${target ? getNumberFormattedString(target.apollo11LotteryTarget) : "-"} LOTEU`}
                                usedColor="yellow"
                            />
                        </div>
                    </Grid>
                    <Grid className="finance__content__profit" direction="column" noPadding noWidth>
                        <p className="value">{target ? (target.lotesProfitEth).toFixed(1) : "-"} ETH</p>
                        <p className="value">{target ? (target.lotesProfitLoteu) : "-"} LOTEU</p>
                        <p className="detail">LOTES Profit Sharing</p>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsLotteryTarget
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(LotteryTarget);
