import {useEffect, useState} from "react";

import {useBooleanState} from "hooks";
// import {getItem, setItem} from "common/storage";
import {DRAW_VIDEO_COUNTDOWN, LAST_GAME_INDEX} from "loteo/constants";

const useLotteryDraw = (
    lotteryInfo: any,
    addGameResolvedListener: (callback: () => void) => void,
    removeGameResolvedListener: (callback: () => void) => void,
    // gameIndexKey: string,
    refreshLotteryInfo: (boolean?) => void
): [boolean, boolean, number | null, () => void, () => void, boolean, () => void] => {
    const [drawDialogVisible, showDrawDialog, hideDrawDialog] = useBooleanState();
    const [drawVideoVisible, showDrawVideo, hideDrawVideo] = useBooleanState();
    const [drawCountdownMillis, setDrawCountdownMillis] = useState<number | null>(null);
    const [videoStartTime, setVideoStartTime] = useState(0);
    // const [drawVideoSkippable, setDrawVideoSkippable] = useState(false);
    const [drawVideoSkippable] = useState(false);

    const showVideo = () => {
        showDrawVideo();
    };

    useEffect(() => {
        if (!lotteryInfo || !lotteryInfo.startsAt || lotteryInfo.startsAt.getTime() < Date.now()) {
            return;
        }

        const timeoutID = setTimeout(refreshLotteryInfo, lotteryInfo.startsAt.getTime() - Date.now());
        return () => clearTimeout(timeoutID);
    }, [lotteryInfo]);

    useEffect(() => {
        // if (!lotteryInfo || !lotteryInfo.gameIndex) {
        if (!lotteryInfo) {
            return;
        }

        // const lastGameIndex = Number(getItem(gameIndexKey));
        // if (lastGameIndex != lotteryInfo.gameIndex) {
        //     setItem(gameIndexKey, lotteryInfo.gameIndex.toString(), {
        //         expires: 14 //days
        //     });

        //     if (lastGameIndex && videoStartTime === 0) {
        //         setDrawCountdownMillis(0);
        //         setDrawVideoSkippable(true);
        //         showDrawDialog();
        //     }
        // }

        if (videoStartTime > 0) {
            setDrawCountdownMillis(videoStartTime - Date.now());

            const intervalID = setInterval(() => {
                const countdownMillis = videoStartTime - Date.now();
                if (countdownMillis <= 0) {
                    setDrawCountdownMillis(0);
                    setVideoStartTime(0);
                    clearInterval(intervalID);
                } else {
                    setDrawCountdownMillis(countdownMillis);
                }
            }, 20);
            return () => clearInterval(intervalID);
        }
    }, [lotteryInfo, videoStartTime]);

    useEffect(() => {
        if (
            !lotteryInfo ||
            !lotteryInfo.startsAt ||
            // !lotteryInfo.gameIndex ||
            lotteryInfo.startsAt.getTime() > Date.now()
        ) {
            return;
        }

        // start date in past => lottery in drawing state
        const gameResolved = () => {
            window.logger.debug("Game resolved");
            setVideoStartTime(Date.now() + DRAW_VIDEO_COUNTDOWN);
            refreshLotteryInfo(lotteryInfo.gameIndex + 1);
        };
        addGameResolvedListener(gameResolved);
        setDrawCountdownMillis(null);
        showDrawDialog();

        return () => removeGameResolvedListener(gameResolved);
    }, [lotteryInfo]);

    return [
        drawDialogVisible,
        drawVideoVisible,
        drawCountdownMillis,
        showVideo,
        hideDrawVideo,
        drawVideoSkippable,
        hideDrawDialog
    ];
};

export default useLotteryDraw;
