import React from "react";
import {useTranslation} from "react-i18next";

import "./infoVideo.scss";

type Props = {
    showVideo?();
};

const InfoVideo = ({showVideo}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "infoVideo";

    return (
        <>
            <div className="infoVideo">
                <img className="texts" src="images/video-texts.svg" alt={t(`${TRANSLATE}.alts.1.alt`)}/>
                <div className="playButtonWrapper">
                    <img className="playButton" src="images/play.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} onClick={showVideo}/>
                    <div className="text">{t(`${TRANSLATE}.watchVideo`)}</div>
                </div>
            </div>
        </>
    );
};
export default InfoVideo;
