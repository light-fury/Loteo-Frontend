import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import Slider from "react-slick";

import {Grid} from "ui/components";
import {Wallet, WeeklyLotteryInfo, ApolloDailyLotteryInfo} from "loteo/types";
import {User} from "auth/types";
// import {NavigationContext} from "app/contexts";
import {useReduxStore, useReduxLoad} from "hooks";
import {getWallet, getApolloDailyLotteryInfo, getApolloDailyLotteryInfoLoading} from "loteo/selectors";
import {getUser} from "auth/selectors";
import {loadApolloDailyLotteryInfo} from "loteo/actions";

import {WeeklyLottery, Apollo11Lottery, DailyLottery, RektRooms} from "./components";

import "./lotteryInfo.scss";

type Props = {
    info: WeeklyLotteryInfo | null;
    loading: boolean;
    buy();
    play?();
};

const LotteryInfo = ({info, loading, buy, play}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "lotteryInfo";

    // const {showGameDetails} = useContext(NavigationContext);
    const [wallet]: [Wallet | null, User | null] = useReduxStore([getWallet, getUser]);
    const [apolloDailyLotteryInfo]: [ApolloDailyLotteryInfo | null] = useReduxLoad(
        [loadApolloDailyLotteryInfo()],
        [getApolloDailyLotteryInfo, getApolloDailyLotteryInfoLoading]
    );
    const sliderRef = useRef<Slider>();

    const appendDots = () => (
        <div>
            <div className="lotteryInfo__slick__dots__inner">
                {sliderRef && sliderRef.current && (
                    <div className="lotteryInfo__slick__dots__inner__prev" onClick={sliderRef.current.slickPrev} />
                )}
                {sliderRef && sliderRef.current && (
                    <div className="lotteryInfo__slick__dots__inner__next" onClick={sliderRef.current.slickNext} />
                )}
            </div>
        </div>
    );

    const customPaging = () => <button />;

    const sliderSettings = {
        className: "lotteryInfo__slick",
        arrows: false,
        dots: true,
        appendDots: appendDots,
        customPaging: customPaging,
        dotsClass: "lotteryInfo__slick__dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000
    };

    return (
        <div className="lotteryInfo">
            <Grid className="lotteryCards" direction="column" noWidth>
                <Grid wrap justify="center" direction="row">
                    <div className="lotteryInfo__header">{t(`${TRANSLATE}.headers.0`)}</div>
                    <div className="lotteryInfo__header" />
                    <div className="lotteryInfo__header" />
                    <div className="lotteryInfo__header" />
                </Grid>
                <Grid wrap justify="center" direction="row">
                    <Grid noPadding noWidth>
                        <Apollo11Lottery data={apolloDailyLotteryInfo} />
                    </Grid>
                    <Grid noPadding noWidth>
                        <WeeklyLottery info={info} loading={loading} wallet={wallet} buyTickets={buy} play={play} />
                    </Grid>
                    <Grid noPadding noWidth>
                        <DailyLottery />
                    </Grid>
                    <Grid noPadding noWidth>
                        <RektRooms />
                    </Grid>
                </Grid>
            </Grid>
            <div className="lotteryInfo__mobile">
                <div className="lotteryInfo__header">{t(`${TRANSLATE}.headers.0`)}</div>
                <div className="lotteryInfo__mobile__slides">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        <Apollo11Lottery data={apolloDailyLotteryInfo} />
                        <WeeklyLottery info={info} loading={loading} wallet={wallet} buyTickets={buy} play={play} />
                        <DailyLottery />
                        <RektRooms />
                    </Slider>
                </div>
            </div>
        </div>
    );
};
export default LotteryInfo;
