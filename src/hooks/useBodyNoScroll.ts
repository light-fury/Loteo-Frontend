import {useEffect} from "react";

export default (enabled = true) => {
    useEffect(() => {
        if (enabled) {
            document.body.classList.add("noScroll");
            return () => document.body.classList.remove("noScroll");
        }
    }, [enabled]);
};
