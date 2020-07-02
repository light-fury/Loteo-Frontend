import React, {useState, useEffect} from "react";
import {useTranslation, Trans} from "react-i18next";
import {Button, ButtonStyle, Dialog, Grid} from "ui/components";
import {getETHString} from "common/utils";
import {LoadingText} from "common/components";

import "./drawDialog.scss";

type Props = {
    countdownMillis: number | null;
    showInProgressText: boolean;
    showResults();
    winner: string;
    prizeETH?: number;
    onFinish();
    currency?: string;
};

type CloseButtonProps = {
    onClick();
};

const CloseButton = ({onClick}: CloseButtonProps) => <div className="close-button" onClick={onClick} />;

const DrawDialog = ({
    countdownMillis,
    showInProgressText,
    showResults,
    winner,
    prizeETH,
    onFinish,
    currency = "eth"
}: Props) => {
    const [showWinner, setShowWinner] = useState(false);
    const [showDialog, setShowDialog] = useState(true);

    useEffect(() => {
        if (!showDialog && !document.body.getElementsByClassName("drawDialog").length) {
            document.body.classList.remove("noScroll");
        }
    }, [showDialog]);
    const {t} = useTranslation();
    const TRANSLATE = "drawDialog";
    const seconds = (countdownMillis && Math.floor(countdownMillis / 1000)) || 0;
    const millis = (countdownMillis && countdownMillis % 1000) || 0;

    const removeVideo = () => {
        setShowDialog(false);
    };

    const isSmallDisplay = window.outerWidth < 800;
    const showWinnerOrResultsVideo = () => {
        if (!isSmallDisplay) {
            showResults();
        } else {
            setShowWinner(true);
        }
    };

    return (
        <Dialog className={`${showDialog ? "drawDialog" : "hideDialog"} ${showWinner ? "hasWinner" : ""}`}>
            <CloseButton onClick={removeVideo} />
            <div className="title">
                <Trans i18nKey={`${TRANSLATE}.title`} />
            </div>
            {countdownMillis !== null && countdownMillis > 0 && (
                <div className="countdownTime">
                    00 : {seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})} .{" "}
                    {millis.toLocaleString(undefined, {minimumIntegerDigits: 3})}
                </div>
            )}
            {countdownMillis === 0 && !showWinner && (
                <Button
                    className="showResultsButton"
                    text={t(`${TRANSLATE}.btnText`)}
                    style={ButtonStyle.Gold}
                    onClick={showWinnerOrResultsVideo}
                />
            )}
            {showInProgressText && <LoadingText className="inProgress" text={t(`${TRANSLATE}.loading`)} />}

            {showWinner && (
                <Grid direction="column" align="center" className="winning">
                    <div className="winner">{winner}</div>
                    {prizeETH && (
                        <div className="prize">
                            <b>{getETHString(prizeETH)}</b> {t(`global.${currency}`)}
                        </div>
                    )}
                    <Button
                        className="goToDashboardButton visible"
                        style={ButtonStyle.Gold}
                        text={t(`${TRANSLATE}.backToDashboard`)}
                        onClick={onFinish}
                    />
                </Grid>
            )}
        </Dialog>
    );
};
export default DrawDialog;
