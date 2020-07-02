import React, {useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// import {loadNews} from "loteo/actions";
import {getNews} from "loteo/selectors";
import {Grid} from "ui/components";

// import {useInterval} from "hooks";

import "./newsBanner.scss";

const PIXELS_PER_SECOND = 30;

type Props = {
    // loadNews();
    // news: object[] | null;
    withBackground?: boolean;
    noPaddingMobile?: boolean;
};

// const NewsBanner = ({loadNews, news, noBackground}: Props) => {
const NewsBanner = ({withBackground, noPaddingMobile}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "newsBanner";

    const containerRef = useRef<HTMLDivElement>(null);
    const [totalItemsWidth, setTotalItemsWidth] = useState(0);
    const [animationDuration, setAnimationDuration] = useState("10s");

    // useEffect(() => {
    //     loadNews();
    // }, [loadNews]);
    // useInterval(loadNews, 60 * 1000);

    const mockedNews = [
        {
            text: t(`${TRANSLATE}.mockedNews.0.text`),
            href: "https://medium.com/loteo/the-loteo-s-unique-triple-affiliate-program-play-win-earn-6169507dd75a"
        },
        {
            text: t(`${TRANSLATE}.mockedNews.1.text`),
            href: "https://www.youtube.com/watch?v=zjcf8hLYQMI"
        },
        {
            text: t(`${TRANSLATE}.mockedNews.2.text`),
            href: "https://medium.com/loteo/the-loteo-moonthly-campaigns-33bd6ee312d1"
        },
        {
            text: t(`${TRANSLATE}.mockedNews.3.text`),
            href: "https://medium.com/loteo/the-loteo-moonthly-campaigns-33bd6ee312d1"
        }
    ];

    useEffect(() => {
        // if (!news) {
        if (!mockedNews) {
            return;
        }

        const container = containerRef.current;

        if (container) {
            const items = container.getElementsByClassName("newsItem");
            let itemWidth = 0;
            // for (let index = 0; index < news.length && index < items.length; index++) {
            for (let index = 0; index < mockedNews.length && index < items.length; index++) {
                itemWidth += items[index].clientWidth;
            }

            setTotalItemsWidth(itemWidth);
        }
        // }, [news]);
    }, [mockedNews]);
    useEffect(() => {
        setAnimationDuration(`${totalItemsWidth / PIXELS_PER_SECOND}s`);
    }, [totalItemsWidth]);

    const toNewsItem = (item, index) => (
        <div key={index} className="newsItem">
            {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text">
                    {item.text}
                </a>
            ) : (
                <div className="text">{item.text}</div>
            )}
            <img src="icons/hex-bullet-yellow.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} />
        </div>
    );

    const containerWidth = containerRef.current ? containerRef.current.clientWidth : 0;
    const getNewsItems = useCallback(() => {
        // if (!news) {
        if (!mockedNews) {
            return [];
        }

        // const items = [...news];
        const items = [...mockedNews];
        let additionalRounds = totalItemsWidth === 0 ? 0 : Math.max(1, (containerWidth * 2) / totalItemsWidth);
        while (additionalRounds-- > 0) {
            // items.push(...news);
            items.push(...mockedNews);
        }
        return items;
        // }, [news, totalItemsWidth, containerWidth]);
    }, [mockedNews, totalItemsWidth, containerWidth]);

    return (
        <div className={`newsBanner ${noPaddingMobile ? "noPaddingMobile" : ""}`}>
            <div className={`newsContainer ${withBackground ? "withBackground" : ""}`} ref={containerRef}>
                <Grid align="center" className="newsContainer__title">
                    {t(`${TRANSLATE}.loteoNews`)}
                </Grid>
                <Grid align="center" className="newsContainer__inner">
                    {!mockedNews && (
                        <div className="newsContainer__inner__loading">{toNewsItem(t(`${TRANSLATE}.loading`), 0)}</div>
                    )}
                    {mockedNews && (
                        <Grid
                            align="center"
                            className="news"
                            style={{
                                width: totalItemsWidth,
                                animationDuration
                            }}
                        >
                            {getNewsItems().map(toNewsItem)}
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    news: getNews(state)
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            // loadNews
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsBanner);
