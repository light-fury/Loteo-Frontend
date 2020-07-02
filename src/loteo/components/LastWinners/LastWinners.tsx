import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getLastWinners, getLastWinnersLoading} from "loteo/selectors";
import {loadLastWinners} from "loteo/actions";
import {EtherscanLink, DrawVideo as WeeklyDrawVideo} from "loteo/components";
import DailyDrawVideo from "loteo/components/LotteryInfo/components/Apollo11Lottery/DrawVideo";
import {Grid, Button, ButtonStyle} from "ui/components";
import {Winner} from "loteo/types";
import {Loading} from "common/components";
import {getETHString, getLoteuString} from "common/utils";
import {useBooleanState} from "hooks";
import {Table} from "ui/components";

import "./lastWinners.scss";

type Props = {
    loadLastWinners();
    winners: Winner[] | null;
    loading: boolean;
    enableStickyWallet?();
    disableStickyWallet?();
};

const LastWinners = ({loadLastWinners, winners, loading, enableStickyWallet, disableStickyWallet}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "lastWinners";

    const [weeklyVideoVisible, showWeeklyVideo, hideWeeklyVideo] = useBooleanState();
    const [apolloVideoVisible, showApolloVideo, hideApolloVideo] = useBooleanState();
    const [visibleVideoIndex, setVisibleVideoIndex] = useState<number | null>(null);

    useEffect(() => {
        loadLastWinners();
    }, [loadLastWinners]);

    const resolveTheme = winner => {
        switch (winner.lottery) {
            case "WEEKLY":
            case "DAILY":
                return {
                    color: "yellow",
                    prize: getETHString(winner.prize),
                    currency: t(`${TRANSLATE}.eth`),
                    watchDraw: idx => {
                        disableStickyWallet && disableStickyWallet();
                        setVisibleVideoIndex(idx);
                        showWeeklyVideo();
                    }
                };
            case "APOLLO_11":
            case "SPECIAL_APOLLO_11":
                return {
                    color: "blue",
                    prize: getLoteuString(winner.prize),
                    currency: t(`${TRANSLATE}.loteu`),
                    watchDraw: idx => {
                        disableStickyWallet && disableStickyWallet();
                        setVisibleVideoIndex(idx);
                        showApolloVideo();
                    }
                };
            default:
                return {
                    color: "yellow",
                    prize: getETHString(winner.prize),
                    currency: t(`${TRANSLATE}.eth`),
                    watchDraw: idx => {
                        disableStickyWallet && disableStickyWallet();
                        setVisibleVideoIndex(idx);
                        showWeeklyVideo();
                    }
                };
        }
    };


    const toWinnerRow = (winner, index) => (
        <Grid key={index} align="center" direction="row" justify="space-between" className="winner">
            <div>
                <img src={`icons/astronaut-${resolveTheme(winner).color}.svg`} alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </div>
            <Grid align="center" justify="space-between">
                <div className="username">{winner.username}</div>
                <Grid className="hidden-desktop-tag">
                    <div className={`lottery ${resolveTheme(winner).color}`}>{t(`${TRANSLATE}.${winner.lottery}`)}</div>
                </Grid>
                <Grid className="hidden-md hidden-lg lottery-mobile">
                    <div className={`lottery ${resolveTheme(winner).color}`}>
                        {t(`${TRANSLATE}.${winner.lottery}MOBILE`)}
                    </div>
                </Grid>
            </Grid>
            <Grid align="end" justify="space-around" className="prize">
                <div className="value">{resolveTheme(winner).prize}</div>
                <div className="currency">{resolveTheme(winner).currency}</div>
                {winner.etherscanURL && <EtherscanLink url={winner.etherscanURL} />}
                {winner && winner.prize && winner.username && (
                    <Grid className="hidden-xs hidden-sm" justify="end">
                        <Button
                            text={t(`${TRANSLATE}.watchDraw`)}
                            style={ButtonStyle.TransparentWhite}
                            onClick={() => resolveTheme(winner).watchDraw(index)}
                        />
                    </Grid>
                )}
            </Grid>

            {weeklyVideoVisible && visibleVideoIndex === index && (
                <WeeklyDrawVideo
                    winner={winner.username}
                    prizeETH={winner.prize}
                    onFinish={() => {
                        enableStickyWallet && enableStickyWallet();
                        hideWeeklyVideo();
                    }}
                    skippable
                    visible={weeklyVideoVisible}
                />
            )}
            {apolloVideoVisible && visibleVideoIndex === index && (
                <DailyDrawVideo
                    winner={winner.username}
                    prizeLoteu={winner.prize}
                    onFinish={() => {
                        enableStickyWallet && enableStickyWallet();
                        hideApolloVideo();
                    }}
                    visible={apolloVideoVisible}
                />
            )}
        </Grid>
    );

    return (
        <div className="lastWinners">
            {loading && <Loading />}
            {!loading && winners && (
                <div className="table desktop-view">
                    <Table data={winners.map(toWinnerRow)} renderable hideHeader />
                </div>
            )}
            {!loading && winners && (
                <div className="table mobile-view">
                    <Table data={winners.map(toWinnerRow)} renderable hideHeader />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    winners: getLastWinners(state),
    loading: getLastWinnersLoading(state)
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadLastWinners
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LastWinners);
