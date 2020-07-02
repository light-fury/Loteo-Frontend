import {useState, useEffect} from "react";

export default (element, isToggleable: boolean = false): boolean => {
    const [focused, setFocused] = useState<boolean>(false);

    const clickWatcher = e => {
        if (element && element.current) {
            const elClicked =
                e.target === element.current ||
                element.current.contains(e.target);

            if (isToggleable) {
                elClicked ? setFocused(focused => !focused) : setFocused(false);
            } else {
                setFocused(elClicked);
            }
        }
    };

    useEffect(() => {
        if (element) {
            document.addEventListener("click", clickWatcher);
            return () => document.removeEventListener("click", clickWatcher);
        }
    }, [element]);

    return focused;
};
