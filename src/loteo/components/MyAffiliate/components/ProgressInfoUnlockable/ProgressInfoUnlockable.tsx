import React from "react";
import {useTranslation} from "react-i18next";
import SVG from "react-inlinesvg";

import {Grid} from "ui/components";

import "./progressInfoUnlockable.scss";

type Props = {
    unlocked?: boolean;
    theme?: string;
    title: string;
    lockedText?: string | null;
    unlockedText?: string | null;
    onInfoClick?: (() => void) | null;
    content?: React.ReactNode | null;
};

const ProgressInfoUnlockable = ({
    unlocked = false,
    theme = "yellow",
    title,
    lockedText,
    unlockedText,
    onInfoClick,
    content
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.progressInfo.unlockables";

    return (
        <div className={`progressInfoUnlockable ${unlocked ? "unlocked" : "locked"}`}>
            <Grid align="center" justify="space-between" className={`progressInfoUnlockable__title ${theme}`}>
                {title}
                <SVG
                    src={unlocked ? "icons/unlocked.svg" : "icons/locked.svg"}
                    className="progressInfoUnlockable__title__icon"
                >
                    <img src={unlocked ? "icons/unlocked.svg" : "icons/locked.svg"} alt={title} />
                </SVG>
            </Grid>
            <div>
                {(lockedText || unlockedText) && (
                    <div className="progressInfoUnlockable__text">
                        {unlocked ? unlockedText : lockedText}
                        {onInfoClick && <span onClick={onInfoClick}>{t(`${TRANSLATE}.learnMore`)}</span>}
                    </div>
                )}
                {content}
            </div>
        </div>
    );
};

export default ProgressInfoUnlockable;
