import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Slider from "react-slick";

import {getLeaderboardWeeklyStats} from "loteo/selectors";
import {loadLeaderboardWeeklyStats} from "loteo/actions";
import {LeaderboardWeeklyStats} from "loteo/types";
import {Table} from "ui/components";

import {LeaderboardItem} from "./components";

import "./leaderboard.scss";

type Props = {
    loadLeaderboardWeeklyStats();
    leaderboardWeeklyStats: LeaderboardWeeklyStats[] | null;
};

const Leaderboard = ({loadLeaderboardWeeklyStats, leaderboardWeeklyStats}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "dashboard.leaderboard";

    const sliderRef = useRef<Slider>();

    useEffect(() => {
        loadLeaderboardWeeklyStats();
    }, [loadLeaderboardWeeklyStats]);

    const appendDots = dots => (
        <div>
            <ul className="leaderboard__slick__dots__inner">{dots}</ul>
        </div>
    );

    const customPaging = () => <button />;

    const sliderSettings = {
        className: "leaderboard__slick",
        arrows: false,
        dots: true,
        appendDots: appendDots,
        customPaging: customPaging,
        dotsClass: "leaderboard__slick__dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const toStatsRow = leaderboardStats => (
        <>
            <div className="leaderboard__header">
                <span className="item">{t(`${TRANSLATE}.game`)}</span>
                <span className="item">{t(`${TRANSLATE}.tickets`)}</span>
                <span className="item">{t(`${TRANSLATE}.totalAmount`)}</span>
            </div>
            <div className="leaderboard__item desktop">
                {leaderboardStats.lotteries.map((stat, index) => (
                    <LeaderboardItem key={index} stat={stat} />
                ))}
            </div>
            {leaderboardStats.games.length > 0 && (
                <>
                    <div className="leaderboard__header">
                        <span className="item">{t(`${TRANSLATE}.game`)}</span>
                        <span className="item">{t(`${TRANSLATE}.users`)}</span>
                        <span className="item">{t(`${TRANSLATE}.totalAmount`)}</span>
                    </div>
                    <div className="leaderboard__item desktop">
                        {leaderboardStats.games.map((stat, index) => (
                            <LeaderboardItem key={index} stat={stat} />
                        ))}
                    </div>
                </>
            )}
        </>
    );

    const toStatsRowMobile = leaderboardStats => (
        <div className="leaderboard__item mobile">
            <Slider ref={sliderRef} {...sliderSettings}>
                {leaderboardStats != null &&
                    leaderboardStats.lotteries.map((stat, index) => <LeaderboardItem key={index} stat={stat} />)}
                {leaderboardStats != null &&
                    leaderboardStats.games.map((stat, index) => <LeaderboardItem key={index} stat={stat} />)}
            </Slider>
        </div>
    );

    return (
        <div className="leaderboard">
            <div className="leaderboard__gameTitle">{t(`${TRANSLATE}.gameTitle`)}</div>
            <h3 className="leaderboard__title">{t(`${TRANSLATE}.leaderboard`)}</h3>
            {leaderboardWeeklyStats != null && (
                <>
                    <div className="desktop">
                        <Table data={leaderboardWeeklyStats.map(toStatsRow)} renderable hideHeader rowsPerPage={1} />
                    </div>
                    <div className="mobile">
                        <Table
                            data={leaderboardWeeklyStats.map(toStatsRowMobile)}
                            renderable
                            hideHeader
                            rowsPerPage={1}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    leaderboardWeeklyStats: getLeaderboardWeeklyStats(state)
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadLeaderboardWeeklyStats
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);
