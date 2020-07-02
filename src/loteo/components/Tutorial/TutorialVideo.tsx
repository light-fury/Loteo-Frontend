import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

import {useBodyNoScroll, useBooleanState} from "hooks";
import {Button, ButtonStyle} from "ui/components";

import "./tutorial.scss";

type Props = {
    onClaim();
};

const TutorialVideo = ({onClaim}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "joyride.video";
    const videoRef = useRef<HTMLVideoElement>(null);
    const [actionsVisible, showActions] = useBooleanState(false);
    const [muted, mute, unmute] = useBooleanState();
    const [playButtonVisible, showPlayButton, hidePlayButton] = useBooleanState();

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            const timeUpdated = e => {
                const currentTime = e.target.currentTime;
                if (currentTime > 57) {
                    showActions();
                    video.ontimeupdate = () => {};
                }
            };
            video.ontimeupdate = timeUpdated;
            video.onended = showActions;

            try {
                video.play();
            } catch (e) {
                showPlayButton();
            }
        }
    }, [videoRef]);

    useBodyNoScroll();

    const playVideo = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            hidePlayButton();
        }
    };

    return (
        <div className="tutorialVideo">
            <video ref={videoRef} preload="auto" muted={muted}>
                <source src="videos/loteo-draw.mp4?version=1" type="video/mp4" />
                {t(`${TRANSLATE}.video`)}
            </video>
            {playButtonVisible && (
                <img
                    className="playButton"
                    src="images/play.svg"
                    onClick={playVideo}
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                />
            )}
            {actionsVisible && (
                <div className="result">
                    <div className="result__code">
                        {t(`${TRANSLATE}.yourCode`)}
                        <span>GAGARIN</span>
                    </div>
                    <div className="result__actions">
                        <Button text={t(`${TRANSLATE}.claimLOTEU`)} style={ButtonStyle.Gold} onClick={onClaim} />
                    </div>
                </div>
            )}
            <div className="buttonPanel">
                <div className="controlButton">
                    <img
                        src={`icons/sound-${muted ? "off" : "on"}.svg`}
                        alt={t(`${TRANSLATE}.alts.${muted ? "1" : "2"}.alt`)}
                        onClick={muted ? unmute : mute}
                    />
                    <div className="tooltip">{t(`${TRANSLATE}.${muted ? "unmute" : "mute"}`)}</div>
                </div>
            </div>
        </div>
    );
};

export default TutorialVideo;
