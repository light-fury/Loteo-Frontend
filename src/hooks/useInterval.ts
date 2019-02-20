import {useEffect} from "react";

export default (fn: Function, interval: number = 1000) => {
    useEffect(() => {
        const updaterID = setInterval(fn, interval);

        return () => clearInterval(updaterID);
    }, []);
};
