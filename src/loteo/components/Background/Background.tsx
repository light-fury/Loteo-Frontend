import React, {lazy} from "react";
import {useTranslation} from "react-i18next";
import {Parallax} from "react-scroll-parallax";
const BackgroundBanner = lazy(() => import("loteo/components/BackgroundBanner"));

import "./background.scss";

type Props = {
    children?: React.ReactNode;
    hideBackgroundEnd?: boolean;
    banners?: boolean;
    className?: string;
};

const Background = ({children, hideBackgroundEnd = false, banners = false, className = ""}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "background";

    return (
        <div className={`background ${className}`} key="backgroundKey">
            <div
                className="radialBackground"
                style={{background: "url('/images/red-bg.png')", backgroundSize: "cover"}}
            >
                {banners && <BackgroundBanner />}
                {!banners && (
                    <div className="elements">
                        <Parallax className="moon" y={[20, -60]}>
                            <img src="images/loteo-moon.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                        </Parallax>
                        <img src="images/bg-texture.svg" className="pattern" alt="bg pattern" />
                        {!hideBackgroundEnd && (
                            <div className="backgroundEnd">
                                <img src="images/background-end.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} />
                            </div>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Background;
