import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import Slider from "react-slick";
import {TabList} from "loteo/types";

import "./headerTabs.scss";

export interface ContextTab {
    name: string;
    path: string;
}

type Props = {
    activePath?: number;
    activate(any);
};

const HeaderTabs = ({activePath, activate}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "headerTabs";
    const sliderRef = useRef<Slider>();

    const toTab = tab => (
        <div
            key={tab.name}
            className={`contextTab ${tab.active === activePath ? "active" : ""}`}
            onClick={() => activate(tab.active)}
        >
            {tab.name}
        </div>
    );

    const nextTab = () => {
        sliderRef.current.slickNext();
    };

    const tabs = [
        {
            name: t(`${TRANSLATE}.6.name`),
            active: TabList.Apollo
        },
        {
            name: t(`${TRANSLATE}.0.name`),
            active: TabList.Weekly
        },
        {
            name: t(`${TRANSLATE}.1.name`),
            active: TabList.Daily
        },
        {
            name: t(`${TRANSLATE}.3.name`),
            active: TabList.Rekt
        },
        {
            name: t(`${TRANSLATE}.2.name`),
            active: TabList.MoF
        },
        {
            name: t(`${TRANSLATE}.7.name`),
            active: TabList.Fomo
        },
        {
            name: t(`${TRANSLATE}.8.name`),
            active: TabList.Jacks
        },
        {
            name: t(`${TRANSLATE}.9.name`),
            active: TabList.Dice
        }
    ];

    const customPaging = () => <button />;

    const slides = () => (
        <>
            <div className="gameSectionTabs__mobile__Tabs">
                <Slider ref={sliderRef} {...sliderSettings}>
                    {tabs.map(toTab)}
                </Slider>
            </div>
            <div className="gameSectionTabs__mobile__dots">
                <div className="gameSectionTabs__mobile__dots__next" onClick={nextTab} />
            </div>
        </>
    );

    const sliderSettings = {
        className: "gameSectionTabs__mobile__Tabs__slick",
        arrows: false,
        customPaging: customPaging,
        initialSlide: activePath,
        infinite: true,
        afterChange: () => {
            sliderRef.current.slickGoTo(activePath);
        },
        pauseOnHover: true,
        slidesToShow: 7,
        slidesToScroll: 1
    };

    return (
        <div className="gameSectionTabs">
            <div className="contextTabs">
                {tabs.map(toTab)}
            </div>
            <div className="gameSectionTabs__mobile">
                {slides()}
            </div>
        </div>
    );
};
export default HeaderTabs;
