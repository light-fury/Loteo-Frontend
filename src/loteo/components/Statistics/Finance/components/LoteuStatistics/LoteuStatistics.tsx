import React, {useEffect} from "react";
import ApexChart from "react-apexcharts";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {
    StatisticsSubHeader as SubHeader,
    LoteuStatisticsCard
} from "loteo/components";
import {Grid} from "ui/components";
import {loadStatisticsLoteu} from "loteo/actions";
import {StatisticsLoteu} from "loteo/types";
import {useReduxStore} from "hooks";
import {getStatisticsLoteu} from "loteo/selectors";
import {getNumberFormattedString} from "common/utils";

import "./loteuStatistics.scss";

type Props = {
    loadStatisticsLoteu();
};

const LoteuStatistics = ({loadStatisticsLoteu}: Props) => {
    const [statisticsLoteu]: [StatisticsLoteu | null] = useReduxStore([getStatisticsLoteu]);

    useEffect(() => {
        loadStatisticsLoteu();
    }, []);

    const options = {
        dataLabels: {
            enabled: false
        },
        colors: [
            "#da2814",
            "#417ed4",
            "#FECF0F",
            "#7ed321"
        ],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            display: "none",
            position: "right",
            offsetY: 0,
            height: 230
        },
        labels: ["LOTEU used in lottery games", "LOTEU for next burning", "Total burned LOTEU", "LOTEU circulating supply"]
    };

    const generateSeriesPart = () => {

        if (statisticsLoteu) {
            return [
                statisticsLoteu.usedLoteu,
                statisticsLoteu.nextBurning,
                statisticsLoteu.totalBurned,
                statisticsLoteu.circulatingSupply
            ];
        } else {
            return [2500, 2500, 2500, 2500];
        }
    };

    const series = generateSeriesPart();

    return (
        <div className="loteuStatistics">
            <SubHeader title="LOTEU Statistics"/>
            <Grid className="loteuStatistics__section" noPadding noWidth>
                <Grid className="loteuStatistics__section__chart" noPadding noWidth>
                    <ApexChart options={options} series={series} type="donut" width="580" />
                </Grid>
                <Grid className="loteuStatistics__section__statistics" direction="column" noPadding noWidth>
                    <LoteuStatisticsCard
                        className="loteuStatistics__section__statistics__total"
                        type="LOTEU TOTAL supply"
                        value={getNumberFormattedString(statisticsLoteu ? statisticsLoteu.totalSupply : 0)}
                        barColor="#da2814"
                    />
                    <Grid className="loteuStatistics__section__statistics__items" wrap noPadding noWidth>
                        <LoteuStatisticsCard
                            className="item"
                            type="LOTEU circulating supply"
                            value={getNumberFormattedString(statisticsLoteu ? statisticsLoteu.circulatingSupply : 0)}
                            barColor="#7ed321"
                        />
                        <LoteuStatisticsCard
                            className="item"
                            type="LOTEU used in lottery games"
                            value={getNumberFormattedString(statisticsLoteu ? statisticsLoteu.usedLoteu : 0)}
                            barColor="#da2814"
                        />
                        <LoteuStatisticsCard
                            className="item"
                            type="LOTEU for next burning"
                            value={getNumberFormattedString(statisticsLoteu ? statisticsLoteu.nextBurning : 0)}
                            barColor="#417ed4"
                        />
                        <LoteuStatisticsCard
                            className="item"
                            type="Total burned LOTEU"
                            value={getNumberFormattedString(statisticsLoteu ? statisticsLoteu.totalBurned : 0)}
                            barColor="#FECF0F"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadStatisticsLoteu
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(LoteuStatistics);
