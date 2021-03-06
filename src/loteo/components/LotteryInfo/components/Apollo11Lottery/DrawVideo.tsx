import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

import {useBodyNoScroll, useBooleanState} from "hooks";
import {Button, ButtonStyle} from "ui/components";
import {getLoteuString} from "common/utils";

type Props = {
    winner: string;
    prizeLoteu: number;
    onFinish();
    visible: boolean;
};

const DrawVideo = ({winner, prizeLoteu, onFinish, visible}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "drawVideo";
    const videoRef = useRef<HTMLVideoElement>(null);
    const [winningVisible, showWinning] = useBooleanState();
    const [goToDashboardVisible, showGoToDashboardVisible] = useBooleanState();
    const [muted, mute, unmute] = useBooleanState();
    const [playButtonVisible, showPlayButton, hidePlayButton] = useBooleanState();

    // Force to pre-load the whole video at once
    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open("GET", "videos/apollo11-draw.mp4", true);
        req.responseType = "blob";

        req.onload = () => {
            if (req.status === 200) {
                const videoBlob = req.response;
                const vid = URL.createObjectURL(videoBlob);

                if (videoRef && videoRef.current) {
                    videoRef.current.src = vid;
                }
            }
        };

        req.onerror = () => {
            if (videoRef && videoRef.current) {
                videoRef.current.src = "videos/apollo11-draw.mp4";
            }
        };

        req.send();
    }, [videoRef]);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            const timeUpdated = e => {
                const currentTime = e.target.currentTime;
                if (currentTime > 30) {
                    showWinning();
                    video.ontimeupdate = null;
                }
            };
            video.ontimeupdate = timeUpdated;
            video.onended = showGoToDashboardVisible;

            if (visible) {
                try {
                    video.play();
                } catch (e) {
                    showPlayButton();
                }
            }
        }
    }, [showGoToDashboardVisible, showPlayButton, showWinning, visible]);

    useBodyNoScroll();

    const playVideo = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            hidePlayButton();
        }
    };

    return (
        <div className="apollo11DrawVideo" style={{display: visible ? "block" : "none"}}>
            <video ref={videoRef} preload="auto" muted={muted}>
                {t(`${TRANSLATE}.video`)}
            </video>
            {winningVisible && (
                <div className="winning">
                    <div className="winner">{winner}</div>
                    <div className="prize">
                        <b>{getLoteuString(prizeLoteu || 0)}</b> LOTEU
                    </div>
                    <Button
                        className={`goToDashboardButton ${goToDashboardVisible ? "visible" : ""}`}
                        style={ButtonStyle.Gold}
                        text={t(`${TRANSLATE}.backToDashboard`)}
                        onClick={onFinish}
                    />
                </div>
            )}
            {playButtonVisible && (
                <img
                    className="playButton"
                    src="images/play.svg"
                    onClick={playVideo}
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                />
            )}
            <div className="buttonPanel">
                {muted ? (
                    <div className="controlButton">
                        <img src="icons/sound-off.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} onClick={unmute} />
                        <div className="tooltip">{t(`${TRANSLATE}.unmute`)}</div>
                    </div>
                ) : (
                    <div className="controlButton">
                        <img src="icons/sound-on.svg" alt={t(`${TRANSLATE}.alts.2.alt`)} onClick={mute} />
                        <div className="tooltip">{t(`${TRANSLATE}.mute`)}</div>
                    </div>
                )}
                <div className="controlButton">
                    <img src="icons/skip.svg" alt={t(`${TRANSLATE}.alts.3.alt`)} onClick={onFinish} />
                    <div className="tooltip">{t(`${TRANSLATE}.skip`)}</div>
                </div>
            </div>
        </div>
    );
};
export default DrawVideo;
