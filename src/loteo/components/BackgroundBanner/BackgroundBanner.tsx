import React, {useRef, useEffect, lazy} from "react";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Slider from "react-slick";
import {useReduxStore, useBooleanState} from "hooks";
import {loadTotalStats, loadMOF24HVolume} from "loteo/actions";
import {
    getConversionRates,
    getMOF24HVolume,
    getTotalStats,
    getWeeklyLotteryInfo,
    getApolloDailyLotteryInfo
} from "loteo/selectors";
import {ConversionRates, TotalStats, MofDailyVolume, WeeklyLotteryInfo, ApolloDailyLotteryInfo} from "loteo/types";
import {useInterval} from "hooks";
import {getLimittedDecimal, getETHString, getLoteuString, getNumberFormattedString} from "common/utils";
const LotteryStatus = lazy(() => import("./components/LotteryStatus"));
const LotteryRevolution = lazy(() => import("./components/LotteryRevolution"));
const Apollo11Lottery = lazy(() => import("./components/Apollo11Lottery"));
const DepositBonus = lazy(() => import("./components/DepositBonus"));
const LoteoPass = lazy(() => import("./components/LoteoPass"));
const TicketBonus = lazy(() => import("./components/TicketBonus"));
const LoteoCharity = lazy(() => import("./components/LoteoCharity"));
const PlayLoteo = lazy(() => import("./components/PlayLoteo"));
const GetLoteu = lazy(() => import("./components/GetLoteu"));
const AffiliateProgram = lazy(() => import("./components/AffiliateProgram"));

import "./backgroundBanner.scss";

type Props = {
    loadTotalStats();
    loadMOF24HVolume();
};

const BackgroundBanner = ({loadTotalStats, loadMOF24HVolume}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "infoVideo";

    const sliderRef = useRef<Slider>();
    const [conversionRates, mofVolume, lotteryStatus, weeklyLotteryInfo, apolloDailyLotteryInfo]: [
        ConversionRates | null,
        MofDailyVolume | null,
        TotalStats | null,
        WeeklyLotteryInfo | null,
        ApolloDailyLotteryInfo | null
    ] = useReduxStore([
        getConversionRates,
        getMOF24HVolume,
        getTotalStats,
        getWeeklyLotteryInfo,
        getApolloDailyLotteryInfo
    ]);
    const [showVideo, setVideo, closeVideo] = useBooleanState(false);

    const appendDots = () => (
        <div>
            <div className="background-banner__slick__dots__inner">
                {sliderRef && sliderRef.current && (
                    <div
                        className="background-banner__slick__dots__inner__prev"
                        onClick={sliderRef.current.slickPrev}
                    />
                )}
                {sliderRef && sliderRef.current && (
                    <div
                        className="background-banner__slick__dots__inner__next"
                        onClick={sliderRef.current.slickNext}
                    />
                )}
            </div>
        </div>
    );

    const customPaging = () => <button />;

    const sliderSettings = {
        className: "background-banner__slick",
        arrows: false,
        dots: true,
        appendDots: appendDots,
        customPaging: customPaging,
        dotsClass: "background-banner__slick__dots",
        infinite: true,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: true
    };

    useEffect(() => {
        loadTotalStats();
        loadMOF24HVolume();
    }, [loadTotalStats, loadMOF24HVolume]);

    useInterval(() => {
        loadTotalStats();
        loadMOF24HVolume();
    }, 6 * 1000);

    const startVideo = () => {
        setVideo();
        document.getElementsByClassName("background-banner")[0]["style"]["z-index"] = "2999";
    };

    const stopVideo = () => {
        closeVideo();
        document.getElementsByClassName("background-banner")[0]["style"]["z-index"] = "0";
    };

    const lotteryStatusInfo = [
        [
            {
                title: "Daily Apollo 11 Lottery",
                subTitle: "Actual Draw",
                value: `${apolloDailyLotteryInfo ? getLoteuString(apolloDailyLotteryInfo.prizeLoteu) : 0} LOTEU`
            },
            {
                title: "Weekly Loteo Lottery",
                subTitle: "Actual Draw",
                value: `${
                    weeklyLotteryInfo ? getLoteuString(getLimittedDecimal(weeklyLotteryInfo.prizeEUR, 1)) : 0
                } EUR`
            },
            {
                title: "Moon Of Fortune",
                subTitle: "Volume / 24 h",
                value: `${mofVolume && mofVolume.volume ? getLoteuString(mofVolume.volume) : 0} LOTEU`
            }
        ],
        [
            {
                title: "LOTEU / USD",
                subTitle: "",
                value: `${conversionRates ? conversionRates.loteuUsdt.toFixed(4) : 0} USD`
            },
            {
                title: "LOTEU / ETH",
                value: `${conversionRates ? conversionRates.loteuEth.toFixed(7) : 0} ETH`,
                subTitle: ""
            },
            {
                title: "LOTEU / BTC",
                subTitle: "",
                value: `${conversionRates ? conversionRates.loteuBtc.toFixed(8) : 0} BTC`
            }
        ],
        [
            {
                title: "TOTAL BETS",
                subTitle: "",
                value: `${lotteryStatus ? getNumberFormattedString(lotteryStatus.totalBets) : 0}`
            },
            {
                title: "TOTAL WIN",
                subTitle: "",
                value: `${lotteryStatus ? getETHString(getLimittedDecimal(lotteryStatus.totalPrizeETH, 1)) : 0} ETH + ${
                    lotteryStatus ? getLoteuString(lotteryStatus.totalPrizeLoteu) : 0
                } LOTEU`,
                isSmall: true
            },
            {
                title: "TOTAL DIVIDENDS",
                subTitle: "",
                value: `${lotteryStatus ? getLimittedDecimal(lotteryStatus.totalDividendsETH, 2) : 0} ETH + ${
                    lotteryStatus ? getLoteuString(lotteryStatus.totalDividendsLoteu) : 0
                } LOTEU`,
                isSmall: true
            }
        ]
    ];
    return (
        <div className="background-banner">
            <Slider ref={sliderRef} {...sliderSettings}>
                <LotteryRevolution startVideo={startVideo}>
                    <LotteryStatus info={lotteryStatusInfo[0]} />
                </LotteryRevolution>
                <Apollo11Lottery>
                    <LotteryStatus info={lotteryStatusInfo[1]} />
                </Apollo11Lottery>
                <DepositBonus>
                    <LotteryStatus info={lotteryStatusInfo[2]} />
                </DepositBonus>
                <LoteoPass>
                    <LotteryStatus info={lotteryStatusInfo[0]} />
                </LoteoPass>
                <TicketBonus>
                    <LotteryStatus info={lotteryStatusInfo[1]} />
                </TicketBonus>
                <GetLoteu>
                    <LotteryStatus info={lotteryStatusInfo[2]} />
                </GetLoteu>
                <LoteoCharity>
                    <LotteryStatus info={lotteryStatusInfo[0]} />
                </LoteoCharity>
                <AffiliateProgram>
                    <LotteryStatus info={lotteryStatusInfo[1]} />
                </AffiliateProgram>
                <PlayLoteo>
                    <LotteryStatus info={lotteryStatusInfo[2]} />
                </PlayLoteo>
            </Slider>
            {showVideo && (
                <div className="videoDialog">
                    <iframe
                        title={t(`${TRANSLATE}.loteo`)}
                        width="100%"
                        height="92%"
                        src="https://www.youtube.com/embed/bW96ZC9uh6k?autoplay=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <img
                        className="closeIcon"
                        src="icons/close.svg"
                        alt={t(`${TRANSLATE}.alts.3.alt`)}
                        onClick={stopVideo}
                    />
                </div>
            )}
        </div>
    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadTotalStats,
            loadMOF24HVolume
        },
        dispatch
    );

export default connect(
    null,
    mapDispatchToProps
)(BackgroundBanner);
