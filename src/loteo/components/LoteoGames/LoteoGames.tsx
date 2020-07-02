import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import Slider from "react-slick";

import {Grid} from "ui/components";

import {MoonOfForutne, Dice, Jacks, Fomo} from "./components";

import "./loteoGames.scss";

type Props = {
    playMOF?();
};

const LoteoGames = ({playMOF}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "lotteryInfo";
    const sliderRef = useRef<Slider>();

    const appendDots = () => (
        <div>
            <div className="loteoGames__slick__dots__inner">
                {sliderRef && sliderRef.current && (
                    <div className="loteoGames__slick__dots__inner__prev" onClick={sliderRef.current.slickPrev} />
                )}
                {sliderRef && sliderRef.current && (
                    <div className="loteoGames__slick__dots__inner__next" onClick={sliderRef.current.slickNext} />
                )}
            </div>
        </div>
    );

    const customPaging = () => <button />;

    const sliderSettings = {
        className: "loteoGames__slick",
        arrows: false,
        dots: true,
        appendDots: appendDots,
        customPaging: customPaging,
        dotsClass: "loteoGames__slick__dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
        // autoplay: true,
        // autoplaySpeed: 3000
    };

    return (
        <div className="loteoGames">
            <Grid className="loteoCards" direction="column" noWidth>
                <Grid wrap justify="center" direction="row">
                    <div className="loteoGames__header">{t(`${TRANSLATE}.headers.1`)}</div>
                    <div className="loteoGames__header" />
                    <div className="loteoGames__header" />
                    <div className="loteoGames__header" />
                </Grid>
                <Grid wrap justify="center" direction="row" noWidth>
                    <Grid className=""  noPadding noWidth>
                        <MoonOfForutne play={playMOF}/>
                    </Grid>
                    <Grid className="" noPadding noWidth>
                        <Fomo />
                    </Grid>
                    <Grid className="c" noPadding noWidth>
                        <Jacks />
                    </Grid>
                    <Grid className="" noPadding noWidth>
                        <Dice />
                    </Grid>
                </Grid>
            </Grid>

            <div className="loteoGames__mobile">
                <div className="loteoGames__header">{t(`${TRANSLATE}.headers.1`)}</div>
                <div className="loteoGames__mobile__slides">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        <MoonOfForutne play={playMOF}/>
                        <Fomo />
                        <Jacks />
                        <Dice />
                    </Slider>
                </div>
            </div>
        </div>
    );
};
export default LoteoGames;
