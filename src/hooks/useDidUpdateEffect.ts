import {useRef, useEffect} from "react";

export default (fn: () => void, deps: any[]) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) fn();
        else didMountRef.current = true;
    }, deps);
};
