import React, {useEffect, useRef} from "react";

import {useBooleanState} from "hooks";

import "./tooltipText.scss";

type Props = {
    className?: string;
    tooltip?: string;
    children: string;
};

const TooltipText = ({className, children, tooltip}: Props) => {
    const [overflowing, setOverflowing, unsetOverflowing] = useBooleanState();
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;

        if (element && element.scrollWidth > element.clientWidth) {
            setOverflowing();
        } else {
            unsetOverflowing();
        }
    }, [children, setOverflowing, unsetOverflowing]);

    return (
        <div className="tooltipText">
            <div className={className} ref={elementRef}>{children}</div>
            {overflowing && <span className="tooltip">{tooltip || children}</span>}
        </div>
    );
};

export default TooltipText;
