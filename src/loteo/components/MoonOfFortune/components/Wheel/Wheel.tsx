import React, {useState, useEffect} from "react";

import {useBooleanState, useMediaQuery} from "hooks";

import {Odds} from "..";

import "./wheel.scss";

type Props = {
    segments: string[];
    availableSegments: object;
    gameStarted: boolean;
    winVisible: boolean;
    result: number;
    spinTime: number;
};

const MoonOfFortuneWheel = ({segments, availableSegments, gameStarted, result, spinTime, winVisible}: Props) => {
    const segmentsLength = segments.length;
    const isSmallScreen = useMediaQuery("(max-width: 768px)");
    const [segmentWidth, setSegmentWidth] = useState<number>(0);
    const [spinAmount, setSpinAmount] = useState<number>(0);
    const [animate, allowAnimation, blockAnimation] = useBooleanState(false);

    useEffect(() => {
        setSegmentWidth(Math.ceil((Math.PI * (isSmallScreen ? 280 : 450)) / segmentsLength));
    }, [segments, isSmallScreen]);

    useEffect(() => {
        if (gameStarted) {
            const newSpinAmount = (360 / segmentsLength) * result;
            allowAnimation();
            setSpinAmount(-3600 - newSpinAmount);
        } else {
            blockAnimation();
            setSpinAmount(spinAmount => spinAmount + 3600);
        }
    }, [gameStarted, result]);

    return (
        <div className="mofWheel">
            <img src="images/MOF-arrow.svg" alt="arrow" />
            <div
                className="mofWheel__inner"
                style={{
                    transform: `rotate(${spinAmount}deg)`,
                    transition:
                        spinAmount < 0 && animate ? `transform  ${spinTime}ms cubic-bezier(0.3, 0.95, 0.67, 1)` : ""
                }}
            >
                {segments.map((item, idx) => (
                    <div
                        key={`mof-wheelSegment-${idx}`}
                        className={`mofWheel__inner__segment ${idx}`}
                        style={{
                            width: `${segmentWidth}px`,
                            borderColor: `${availableSegments[item]} transparent`,
                            borderRight: `${segmentWidth / 2}px solid`,
                            borderLeft: `${segmentWidth / 2}px solid`,
                            transform: `rotate(${(360 / segmentsLength) * idx}deg)`,
                            left: `calc(50% - ${segmentWidth / 2}px)`
                        }}
                    >
                        <div className={`mofWheel__inner__segment__value ${item === "0.0" ? "skull" : ""}`}>
                            {item === "0.0" ? <img src="icons/skull.svg" alt="0.0x" /> : `${item}x`}
                        </div>
                    </div>
                ))}
                <div className="mofWheel__inner__moon" />
            </div>
            {winVisible && <div className="mofWheel__win">{segments[result]} x</div>}
            <Odds availableSegments={availableSegments} result={segments[result]} showWin={winVisible} />
        </div>
    );
};

export default MoonOfFortuneWheel;
