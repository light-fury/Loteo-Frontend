import {useRef, useEffect} from "react";

export default <T extends HTMLElement>(holdAction: () => void, delay = 100) => {
    const elementRef = useRef<T>(null);
    const holdActionRef = useRef(holdAction);

    useEffect(() => {
        holdActionRef.current = holdAction;
    });

    useEffect(() => {
        const element = elementRef.current;
        if (element) {
            let intervalID;

            const onPress = e => {
                e.preventDefault();
                if (intervalID) {
                    clearInterval(intervalID);
                }

                holdActionRef.current();
                intervalID = setInterval(() => {
                    holdActionRef.current();
                }, delay);
            };

            const onRelease = e => {
                e.preventDefault();
                clearInterval(intervalID);
            };

            element.addEventListener("mousedown", onPress);
            element.addEventListener("touchstart", onPress);
            element.addEventListener("mouseup", onRelease);
            element.addEventListener("touchend", onRelease);

            return () => {
                clearInterval(intervalID);
                element.removeEventListener("mousedown", onPress);
                element.removeEventListener("touchstart", onPress);
                element.removeEventListener("mouseup", onRelease);
                element.removeEventListener("touchend", onRelease);
            };
        }
    }, [delay]);

    return elementRef;
};
