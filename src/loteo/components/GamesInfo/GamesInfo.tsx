import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Slider from "react-slick";
import {withRouter} from "react-router";
import {Helmet} from "react-helmet";

import {Match} from "app/types";
import HeaderTabs from "./HeaderTabs";
import {TabList} from "loteo/types";
import {GameContent, Footer, Header, NetworksSidebar} from "loteo/components";

import {
    Apollo11Lottery,
    WeeklyLottery,
    MoF,
    RektRoom,
    DailyLottery,
    Dice,
    Fomo,
    Jacks
} from "./GamesSlides";

import "./gamesInfo.scss";

type Props = {
    location: Location;
    match: Match;
};

const GamesInfo = ({location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "gamesInfo";

    const [activeGame, setActiveGame] = useState(location["state"] ? location["state"]["subRoute"] : 0);
    const sliderRef = useRef<Slider>();

    const activeSection = (section) => {
        setActiveGame(section);
        sliderRef.current.slickGoTo(section);
    };

    const appendDots = () => (
        <div>
            <div className="gamesInfo__slides__slick__dots__inner">
                <div
                    className="gamesInfo__slides__slick__dots__inner__prev"
                    onClick={() => {
                        sliderRef.current.slickPrev();
                    }}
                />
                <div
                    className="gamesInfo__slides__slick__dots__inner__next"
                    onClick={() => {
                        sliderRef.current.slickNext();
                    }}
                />
            </div>
        </div>
    );

    const customPaging = () => <button />;

    const sliderSettings = {
        className: "gamesInfo__slides__slick",
        initialSlide: activeGame,
        arrows: false,
        dots: true,
        appendDots: appendDots,
        customPaging: customPaging,
        dotsClass: "gamesInfo__slides__slick__dots",
        infinite: true,
        afterChange: (current) => {
            setActiveGame(current);
        },
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="gamesInfo">
            <NetworksSidebar />
            <Helmet>
                <title>{t(`${TRANSLATE}.title`)}</title>
            </Helmet>
            <div className="gamesInfo__header">
                <Header />
            </div>
            <div className="gamesInfo__slides">
                <Slider ref={sliderRef} {...sliderSettings}>
                    <div>
                        <Apollo11Lottery>
                            <HeaderTabs activePath={TabList.Apollo} activate={activeSection}/>
                        </Apollo11Lottery>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <WeeklyLottery>
                            <HeaderTabs activePath={TabList.Weekly} activate={activeSection}/>
                        </WeeklyLottery>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <DailyLottery>
                            <HeaderTabs activePath={TabList.Daily} activate={activeSection}/>
                        </DailyLottery>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <RektRoom>
                            <HeaderTabs activePath={TabList.Rekt} activate={activeSection}/>
                        </RektRoom>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <MoF>
                            <HeaderTabs activePath={TabList.MoF} activate={activeSection}/>
                        </MoF>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <Fomo>
                            <HeaderTabs activePath={TabList.Fomo} activate={activeSection}/>
                        </Fomo>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <Jacks>
                            <HeaderTabs activePath={TabList.Jacks} activate={activeSection}/>
                        </Jacks>
                        <GameContent activeGame={activeGame}/>
                    </div>
                    <div>
                        <Dice>
                            <HeaderTabs activePath={TabList.Dice} activate={activeSection}/>
                        </Dice>
                        <GameContent activeGame={activeGame}/>
                    </div>
                </Slider>
            </div>
            <Footer />
        </div>
    );
};

export default withRouter(GamesInfo);
