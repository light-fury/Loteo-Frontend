import {useEffect, useRef} from "react";

export default (fn: Function, interval: number = 1000) => {
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        const updaterID = setInterval(() => fnRef.current(), interval);

        return () => clearInterval(updaterID);
    }, [interval]);
};
