import React from "react";

import "./grid.scss";

type AlignValues = "stretch" | "center" | "start" | "end" | "baseline" | "initial" | "inherit";

type JustifyValues = "start" | "end" | "center" | "space-between" | "space-around" | "initial" | "inherit";

type DirectionValues = "row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit";

type Props = {
    container?: boolean;
    wrap?: boolean;
    align?: AlignValues;
    justify?: JustifyValues;
    direction?: DirectionValues;
    noPadding?: boolean;
    noWidth?: boolean;
    className?: string;
    children?: React.ReactNode[] | React.ReactNode;
    style?: object;
    onClick?();
};

const Grid = ({
    container,
    wrap,
    align = "stretch",
    justify = "start",
    direction,
    noPadding,
    noWidth,
    className,
    children,
    style,
    onClick
}: Props) => {
    const resolveClassName = () =>
        [
            "loteoGrid",
            container ? "container" : null,
            wrap ? "wrap" : null,
            `align-${align}`,
            `justify-${justify}`,
            direction ? `direction-${direction}` : null,
            noPadding ? "no-padding" : null,
            noWidth ? "no-width" : null,
            className
        ].join(" ");

    return (
        <div className={resolveClassName()} style={style} onClick={onClick}>
            {children}
        </div>
    );
};

export default Grid;
