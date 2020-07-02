import React, {useCallback, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {Parallax, ParallaxLayer} from "react-spring/renderprops-addons";
import throttle from "lodash/throttle";

import "./roadmap.scss";

const Roadmap = () => {
    const {t} = useTranslation();
    const TRANSLATE = "roadmap";
    const roadmapRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<Parallax>(null);

    const scrollChanged = useCallback(throttle(
        () => {
            const parallax = parallaxRef.current;
            const roadmap = roadmapRef.current;

            if (parallax && roadmap) {
                // @ts-ignore
                parallax.onScroll({
                    target: {
                        scrollTop: Math.max(0, -roadmap.getBoundingClientRect().top + window.innerHeight)
                    }
                });
            }
        },
        100
    ), []);

    useEffect(() => {
        window.addEventListener("scroll", scrollChanged);

        return () => window.removeEventListener("scroll", scrollChanged);
    }, [scrollChanged]);

    return (
        <div ref={roadmapRef} className="roadmap">
            <div className="roadmapBackground">
                <div className="parallax">
                    <Parallax ref={parallaxRef} pages={0.5} scrolling={false}>
                        <ParallaxLayer offset={0} speed={-0.1}>
                            <img className="moon" src="images/loteo-moon.png" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
                        </ParallaxLayer>
                    </Parallax>
                </div>
            </div>
            <div className="content">
                <h1>{t(`${TRANSLATE}.title`)}</h1>
                <h6>{t(`${TRANSLATE}.subTitle`)}</h6>
                <div className="timeline">
                    <div className="years">
                        <div className="year">{t(`${TRANSLATE}.years.0.year`)}</div>
                        <div className="year">{t(`${TRANSLATE}.years.1.year`)}</div>
                        <div className="year">{t(`${TRANSLATE}.years.2.year`)}</div>
                        <div className="year">{t(`${TRANSLATE}.years.3.year`)}</div>
                    </div>
                    <div className="line"/>
                    <div className="milestones">
                        <div className="milestone">
                            <div className="quarter"><div className="done" /></div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.0.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.0.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 32}}>
                            <div className="bullet"/>
                            <div className="date">{t(`${TRANSLATE}.item.1.date`)}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.1.p1`)}</p>
                                <p className="big">{t(`${TRANSLATE}.item.1.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 40}}>
                            <div className="quarter"><div className="done" /></div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.2.p1`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 32}}>
                            <div className="bullet"/>
                            <div className="date">{t(`${TRANSLATE}.item.3.date`)}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.3.p1`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 32}}>
                            <div className="bullet"/>
                            <div className="date">{t(`${TRANSLATE}.item.4.date`)}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.4.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.4.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 40}}>
                            <div className="quarter-transparent">{t(`${TRANSLATE}.item.5.date`)}</div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.5.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.5.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 64}}>
                            <div className="quarter-transparent">{t(`${TRANSLATE}.item.6.date`)}</div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.6.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.6.p2`)}</p>
                                <p>{t(`${TRANSLATE}.item.6.p3`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 140}}>
                            <div className="quarter-transparent">{t(`${TRANSLATE}.item.7.date`)}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.7.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.7.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 60}}>
                            <div className="quarter-transparent">{t(`${TRANSLATE}.item.8.date`)}</div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.8.p1`)}</p>
                                <p>{t(`${TRANSLATE}.item.8.p2`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 60}}>
                            <div className="quarter-transparent">{t(`${TRANSLATE}.item.9.date`)}</div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.9.p1`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 160}}>
                            <div className="quarter-transparent">{"\u2b24"}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.10.p1`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 64}}>
                            <div className="quarter-transparent">{"\u2b24"}</div>
                            <div className="description">
                                <p>{t(`${TRANSLATE}.item.11.p1`)}</p>
                            </div>
                        </div>
                        <div className="milestone" style={{marginTop: 160}}>
                            <div className="quarter-transparent">{"\u2b24"}</div>
                            <div className="description">
                                <p className="big">{t(`${TRANSLATE}.item.12.p1`)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Roadmap;
