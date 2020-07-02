import {useEffect} from "react";

export default (allowed = true) => {
    useEffect(() => {
        if (allowed) {
            window.scrollTo(0, 0);
        }
    }, []);
};
