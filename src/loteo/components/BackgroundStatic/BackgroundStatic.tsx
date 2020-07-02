import React from "react";

import "./backgroundStatic.scss";

type Props = {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
};

const BackgroundStatic = ({className = "", children}: Props) => (
    <div className={`backgroundStatic ${className}`}>{children}</div>
);

export default BackgroundStatic;
