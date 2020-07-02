import React, {useState} from "react";

import "./loadingText.scss";
import useInterval from "hooks/useInterval";

type Props = {
    className?: string;
    text: string;
};

const LoadingText = ({className = "", text}: Props) => {
    const [dots, setDots] = useState("");

    useInterval(() => {
        const nextDots = dots + ".";
        setDots(nextDots.length > 3 ? "" : nextDots);
    }, 500);

    return (
        <div className={`loadingText ${className}`}>
            {text}{dots}
        </div>
    );
};
export default LoadingText;
