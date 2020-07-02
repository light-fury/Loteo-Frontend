import React, {useState, useCallback} from "react";

import {useInterval} from "hooks";

import Counter from "./Counter";

type Props = {
    untilDate: Date;
    shortenTimeBy?: number;
    daily?: boolean;
};

const CounterContainer = ({untilDate, shortenTimeBy, daily}: Props) => {
    const time = shortenTimeBy ? untilDate.getTime() - shortenTimeBy : untilDate.getTime();
    const calculateSeconds = useCallback(() => Math.max(0, Math.floor((time - new Date().getTime()) / 1000)), [
        untilDate
    ]);
    const [seconds, setSeconds] = useState(calculateSeconds());

    useInterval(() => setSeconds(calculateSeconds()));

    return <Counter seconds={seconds} daily={daily} />;
};

export default React.memo(CounterContainer);
