import {DependencyList, useEffect, useRef} from "react";

export default (time = 500, callback: () => void, deps: DependencyList) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const timeoutID = setTimeout(() => callbackRef.current(), time);
        return () => clearTimeout(timeoutID);
    }, deps);
};
